import connectDB from "../../../utils/connectDB";
import Product from "../../../models/productModel";
import Category from "../../../models/categoryModel";
import SubCategory from "../../../models/subCategoryModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "title slug", Category)
      .populate("subCategory", "title slug", SubCategory)
      .sort({ createdAt: -1 });

    res.json({
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      slug,
      title,
      content,
      category,
      subCategory,
      related,
      images,
      price,
      inStock,
    } = req.body;

    if (
      !slug ||
      !title ||
      !content ||
      !category ||
      !subCategory ||
      !related ||
      images.length === 0 ||
      !price ||
      !inStock
    )
      return res.status(400).json({ err: "Please add all the fields." });

    const newProduct = new Product({
      slug,
      title,
      content,
      category,
      subCategory,
      related,
      images,
      price,
      inStock,
    });

    await newProduct.save();

    res.json({ msg: "Success! Created a new product" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
