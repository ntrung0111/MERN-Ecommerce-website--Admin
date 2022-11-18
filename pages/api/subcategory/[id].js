import connectDB from "../../../utils/connectDB";
import Category from "../../../models/categoryModel";
import SubCategory from "../../../models/subCategoryModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      const { product } = req.query;
      if (product) await getSubCategoryProduct(req, res);
      else await getSubCategory(req, res);
      break;
    case "PUT":
      await putSubCategory(req, res);
      break;
    case "DELETE":
      await deleteSubCategory(req, res);
      break;
  }
};

const getSubCategoryProduct = async (req, res) => {
  const { id } = req.query;

  try {
    const subCategory = await SubCategory.find({ category: id });

    res.json({
      subCategory,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getSubCategory = async (req, res) => {
  const { id } = req.query;

  try {
    const subCategory = await SubCategory.findOne({ _id: id });
    const categories = await Category.find({});

    res.json({
      subCategory,
      categories,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const putSubCategory = async (req, res) => {
  const { id } = req.query;
  const { slug, title, title_en, category, isPublic } = req.body;

  if (!slug || !title || !title_en || !category)
    return res.status(400).json({ err: "Please add all the fields." });

  try {
    const subCategory = await SubCategory.findOneAndUpdate(
      { _id: id },
      {
        slug,
        title,
        title_en,
        category,
        public: JSON.parse(isPublic),
      },
      { new: true }
    );

    res.json({
      subCategory,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteSubCategory = async (req, res) => {
  const { id } = req.query;

  try {
    await SubCategory.findOneAndDelete({ _id: id });

    res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
