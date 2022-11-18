import connectDB from "../../../utils/connectDB";
import Category from "../../../models/categoryModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getCategory(req, res);
      break;
    case "PUT":
      await putCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};

const getCategory = async (req, res) => {
  const { id } = req.query;

  try {
    const category = await Category.findOne({ _id: id });

    res.json({
      category,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const putCategory = async (req, res) => {
  const { id } = req.query;
  const { slug, title, title_en, image, isPublic } = req.body;

  if (!slug || !title || !title_en || !image)
    return res.status(400).json({ err: "Please add all the fields." });

  try {
    const category = await Category.findOneAndUpdate(
      { _id: id },
      {
        slug,
        title,
        title_en,
        image,
        public: JSON.parse(isPublic),
      },
      { new: true }
    );

    res.json({
      category,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.query;

  try {
    await Category.findOneAndDelete({ _id: id });

    res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
