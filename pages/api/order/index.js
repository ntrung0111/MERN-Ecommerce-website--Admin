import connectDB from "../../../utils/connectDB";
import Order from "../../../models/orderModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getOrders(req, res);
      break;
  }
};

const getOrders = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    let chartData, orderQuery;

    if (startDate && endDate) {
      chartData = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) },
            $or: [{ orderStatus: "PENDING" }, { orderStatus: "APPROVED" }],
          },
        },
        {
          $project: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            date: { $dayOfMonth: "$createdAt" },
            revenue: "$amount",
          },
        },
        {
          $group: {
            _id: {
              year: "$year",
              month: "$month",
              date: "$date",
            },
            revenue: { $sum: "$revenue" },
            order: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            date: "$_id.date",
            revenue: 1,
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
                Revenue: "$revenue",
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
        },
      };
    } else {
      chartData = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: lastYear },
            $or: [{ orderStatus: "PENDING" }, { orderStatus: "APPROVED" }],
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            revenue: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            revenue: { $sum: "$revenue" },
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
        },
      };
    }

    const orders = await Order.find({}).sort({ createdAt: -1 });

    const ordersGrid = await Order.aggregate([
      orderQuery,
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.json({
      chartData,
      ordersHome: orders.slice(0, 20),
      orders,
      ordersGrid,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
