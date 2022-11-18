import connectDB from "../../../utils/connectDB";
import Contact from "../../../models/contactModel";
import Product from "../../../models/productModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getContact(req, res);
      break;
    case "PUT":
      await putContact(req, res);
      break;
    case "DELETE":
      await deleteContact(req, res);
      break;
  }
};

const getContact = async (req, res) => {
  const { id } = req.query;

  try {
    const contact = await Contact.findOne({ _id: id }).populate(
      "product",
      "",
      Product
    );

    res.json({
      contact,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const putContact = async (req, res) => {
  const { id } = req.query;
  const { status } = req.body;

  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: id },
      { contactStatus: status },
      { new: true }
    ).populate("product", "", Product);

    res.json({
      contact,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.query;

  try {
    await Contact.findOneAndDelete({ _id: id });

    res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
