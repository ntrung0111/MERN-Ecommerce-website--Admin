import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    orderList: { type: Array, required: true },
    amount: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      type: Object,
      required: true,
    },
    orderStatus: { type: String, required: true, default: "PENDING" },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.order || mongoose.model("order", OrderSchema);
