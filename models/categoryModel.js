import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    title_en: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    public: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.category ||
  mongoose.model("category", CategorySchema);
