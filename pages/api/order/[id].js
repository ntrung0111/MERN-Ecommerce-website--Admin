import connectDB from "../../../utils/connectDB";
import Order from "../../../models/orderModel";
import Product from "../../../models/productModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getOrder(req, res);
      break;
    case "PUT":
      const { isDeleted } = req.query;
      if (isDeleted) await updateIsDeleteOrder(req, res, isDeleted);
      else await putOrder(req, res);
      break;
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.query;

    const order = await Order.findOne({ _id: id });

    res.json({ order });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const putOrder = async (req, res) => {
  try {
    const { id } = req.query;
    const { status } = req.body;
    let increase = null;

    const order = await Order.findOneAndUpdate(
      { _id: id },
      { orderStatus: status }
    );

    let products = order.orderList;

    if (status === "APPROVED" && order.orderStatus === "DECLINED") {
      increase = true;
    }

    if (status === "DECLINED" && order.orderStatus === "APPROVED") {
      increase = false;
    }

    if (increase !== null) {
      products = await Promise.all(
        products.map(async (item) => {
          const newInStock = await updateQuantityProduct(item, increase);

          return { ...item, inStock: newInStock };
        })
      );
    }

    res.json({
      order: { ...order._doc, orderStatus: status, orderList: products },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateIsDeleteOrder = async (req, res, isDeleted) => {
  try {
    const { id } = req.query;

    const order = await Order.findOneAndUpdate(
      { _id: id },
      { isDeleted },
      { new: true }
    );

    res.json({ order });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateQuantityProduct = async (productCart, increase) => {
  const currentProduct = await Product.findOne({ _id: productCart._id });

  let newInStock = currentProduct.inStock + productCart.quantity,
    newSold = currentProduct.sold - productCart.quantity;

  if (increase) {
    newInStock = currentProduct.inStock - productCart.quantity;
    newSold = currentProduct.sold + productCart.quantity;
  }

  if (newInStock < 0 || newSold < 0) return;

  await Product.findOneAndUpdate(
    {
      _id: currentProduct._id,
    },
    {
      inStock: newInStock,
      sold: newSold,
      available: newInStock <= 0 ? false : true,
    }
  );

  return newInStock;
};

export default index;
