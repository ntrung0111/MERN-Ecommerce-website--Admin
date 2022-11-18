import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { format } from "timeago.js";

import { deleteDataAPI, getDataAPI, putDataAPI } from "../../utils/fetchData";
import { getTime } from "../../utils/formatData";

export default function Category({ data }) {
  const router = useRouter();

  const [contact, setContact] = useState(data);

  const handleChangeContactStatus = async (status) => {
    const res = await putDataAPI(
      `/contact/${contact._id}`,
      { status: status },
      null
    );

    setContact(res.contact);
  };

  const handleDeleteContact = async () => {
    if (confirm("Are you sure to delete this contact?")) {
      await deleteDataAPI(`/contact/${contact._id}`, null, null);

      router.push("/contacts");
    }
  };

  return (
    <div className="contact">
      <div className="contactContainer">
        <h1 className="contact">Contact: {contact._id}</h1>
      </div>
      <div className="productBottom">
        <div className="customerInfoContainer">
          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Customer name: </span>
            <span>{contact.name}</span>
          </div>

          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Customer email: </span>
            <span>{contact.email}</span>
          </div>

          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Customer message: </span>
            <br />
            <span style={{ whiteSpace: "break-spaces" }}>
              {contact.message}
            </span>
          </div>

          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Product: </span> <br />
            <Link href={`/product/${contact.product._id}`}>
              <a>
                <img
                  style={{ width: "200px" }}
                  src={contact.product.images[0]}
                  alt=""
                />
              </a>
            </Link>
          </div>

          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Contact status: </span>
            <span className={`status--${contact.contactStatus}`}>
              {contact.contactStatus}
            </span>
          </div>

          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Contact time: </span>
            <span>
              {contact.createdAt.slice(0, 10)} - {getTime(contact.createdAt)} -{" "}
              {format(contact.createdAt)}
            </span>
          </div>

          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Contact time update: </span>
            <span>
              {contact.createdAt.slice(0, 10)} - {getTime(contact.updatedAt)} -{" "}
              {format(contact.updatedAt)}
            </span>
          </div>
        </div>
      </div>
      <button className="deleteProductButton" onClick={handleDeleteContact}>
        Delete Contact
      </button>
      {contact.contactStatus !== "VIEWED" && (
        <div className="buttons">
          <button
            className="approved"
            onClick={() => handleChangeContactStatus("VIEWED")}
          >
            VIEWED
          </button>
        </div>
      )}
      <br />
      <br />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await getDataAPI(`/contact/${id}`, null);

  return {
    props: {
      data: res.contact,
    },
  };
}
