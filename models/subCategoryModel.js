import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubCategorySchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    title_en: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    amount: { type: Number, default: 0 },
    public: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.subCategory ||
  mongoose.model("subCategory", SubCategorySchema);
