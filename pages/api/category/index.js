import connectDB from "../../../utils/connectDB";
import Category from "../../../models/categoryModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
    case "GET":
      await getCategory(req, res);
      break;
  }
};

const createCategory = async (req, res) => {
  try {
    const { title, title_en, slug, image } = req.body;

    if (!title || !title_en || !slug || !image)
      return res.status(400).json({ err: "Please add all the fields." });

    const newCategory = new Category({ title, title_en, slug, image });

    await newCategory.save();

    res.json({
      msg: "Success! Created a new category.",
      newCategory,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.find({});

    res.json({ categories: category });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
