import connectDB from "../../../utils/connectDB";
import Product from "../../../models/productModel";
import SubCategory from "../../../models/subCategoryModel";
import Order from "../../../models/orderModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PUT":
      await putProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id, startDate, endDate } = req.query;

    const product = await Product.findOne({ _id: id });

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    let chartData, orderQuery;

    if (startDate && endDate) {
      chartData = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) },
            orderList: { $elemMatch: { _id: id } },
            $or: [{ orderStatus: "PENDING" }, { orderStatus: "APPROVED" }],
          },
        },
        {
          $project: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            date: { $dayOfMonth: "$createdAt" },
            sold: {
              $filter: {
                input: "$orderList",
                cond: { $eq: ["$$this._id", id] },
              },
            },
          },
        },
        {
          $project: {
            year: "$year",
            month: "$month",
            date: "$date",
            quantity: { $first: "$sold.quantity" },
          },
        },
        {
          $group: {
            _id: {
              year: "$year",
              month: "$month",
              date: "$date",
            },
            quantity: { $sum: "$quantity" },
            order: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            date: "$_id.date",
            quantity: 1,
            order: 1,
          },
        },
        {
          $sort: {
            _id: 1,
            year: 1,
            month: 1,
            date: 1,
          },
        },
        {
          $group: {
            _id: "$month",
            year: { $first: "$year" },
            values: {
              $push: {
                date: "$date",
                Sold: "$quantity",
                Order: "$order",
              },
            },
          },
        },
        {
          $sort: {
            year: 1,
            _id: 1,
          },
        },
      ]);

      orderQuery = {
        $match: {
          createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) },
          orderList: { $elemMatch: { _id: id } },
        },
      };
    } else {
      chartData = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: lastYear },
            orderList: { $elemMatch: { _id: id } },
            $or: [{ orderStatus: "PENDING" }, { orderStatus: "APPROVED" }],
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sold: {
              $filter: {
                input: "$orderList",
                cond: { $eq: ["$$this._id", id] },
              },
            },
          },
        },
        {
          $project: {
            month: "$month",
            values: { $first: "$sold.quantity" },
          },
        },
        {
          $group: {
            _id: "$month",
            sold: { $sum: "$values" },
            order: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

      orderQuery = {
        $match: {
          createdAt: { $gte: lastYear },
          orderList: { $elemMatch: { _id: id } },
        },
      };
    }

    const orders = await Order.aggregate([
      orderQuery,
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.json({
      chartData,
      product,
      orders,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const putProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const {
      slug,
      title,
      content,
      category,
      subCategory,
      related,
      images,
      price,
      sold,
      inStock,
      isPublic,
      available,
    } = req.body;

    if (
      !slug ||
      !title ||
      !content ||
      !category ||
      !subCategory ||
      !related ||
      images.length === 0 ||
      !price ||
      !inStock
    )
      return res.status(400).json({ err: "Please add all the fields." });

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        slug,
        title,
        content,
        category,
        subCategory,
        related,
        images,
        price,
        sold,
        inStock,
        public: JSON.parse(isPublic),
        available,
      }
    );

    let querySubCategory = null;

    if (subCategory === product.subCategory) {
      if (!JSON.parse(isPublic) && product.public) {
        querySubCategory = { $inc: { amount: -1 } }; // decrease subCategory amount
      }

      if (JSON.parse(isPublic) && !product.public) {
        querySubCategory = { $inc: { amount: 1 } }; // increase subCategory amount
      }

      if (querySubCategory !== null)
        await SubCategory.findOneAndUpdate(
          { _id: product.subCategory },
          querySubCategory
        );
    } else {
      if (JSON.parse(isPublic) === product.public) {
        if (JSON.parse(isPublic)) {
          // old Subcategory -1 amount
          await SubCategory.findOneAndUpdate(
            { _id: product.subCategory },
            { $inc: { amount: -1 } }
          );

          // new Subcategory +1 amount
          await SubCategory.findOneAndUpdate(
            { _id: subCategory },
            { $inc: { amount: 1 } }
          );
        }
      }

      if (JSON.parse(isPublic) !== product.public) {
        if (!JSON.parse(isPublic) && product.public) {
          // old Subcategory -1 amount
          await SubCategory.findOneAndUpdate(
            { _id: product.subCategory },
            { $inc: { amount: -1 } }
          );
        }

        if (JSON.parse(isPublic) && !product.public) {
          // new Subcategory +1 amount
          await SubCategory.findOneAndUpdate(
            { _id: subCategory },
            { $inc: { amount: 1 } }
          );
        }
      }
    }

    const newProduct = await Product.findOne({ _id: id });

    res.json({ product: newProduct });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.query;
  try {
    await Product.findOneAndDelete({ _id: id });

    res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
