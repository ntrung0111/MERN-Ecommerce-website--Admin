import connectDB from "../../../utils/connectDB";
import Contact from "../../../models/contactModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getContact(req, res);
      break;
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await Contact.find({}).sort({ createdAt: -1 });

    res.json({ contacts: contact });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
