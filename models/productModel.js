import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "subCategory",
      required: true,
    },
    related: { type: String },
    images: {
      type: Array,
      required: true,
      validate: {
        validator: function (array) {
          return array.every((v) => typeof v === "string");
        },
      },
    },
    price: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      required: true,
    },
    available: { type: Boolean, default: true },
    public: { type: Boolean, default: false },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.product ||
  mongoose.model("product", ProductSchema);
