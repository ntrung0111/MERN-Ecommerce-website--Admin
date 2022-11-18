import connectDB from "../../../utils/connectDB";
import SubCategory from "../../../models/subCategoryModel";
import Category from "../../../models/categoryModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "POST":
      await createSubCategory(req, res);
      break;
    case "GET":
      const { product } = req.query;
      if (product) await getSubCategoryProduct(req, res);
      else await getSubCategory(req, res);
      break;
  }
};

const createSubCategory = async (req, res) => {
  try {
    const { title, title_en, slug, category } = req.body;
    if (!title || !title_en || !slug || !category)
      return res.status(400).json({ err: "Please add all the fields." });

    const newSubCategory = new SubCategory({
      title,
      title_en,
      slug,
      category,
    });

    await newSubCategory.save();
    res.json({
      msg: "Success! Created a new subCategory.",
      newSubCategory,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getSubCategoryProduct = async (req, res) => {
  try {
    const subCategory = await SubCategory.find({ category: req.query.id })
      .populate("category", "-createdAt -updatedAt -__v", Category)
      .select("-createdAt -updatedAt -__v");

    res.json({ subCategory });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.find({}).populate(
      "category",
      "-createdAt -updatedAt -__v",
      Category
    );

    res.json({ subCategories: subCategory });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
