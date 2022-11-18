import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ContactSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    message: { type: String, required: true },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    contactStatus: { type: String, required: true, default: "PENDING" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.contact ||
  mongoose.model("contact", ContactSchema);
