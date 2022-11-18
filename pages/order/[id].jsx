import Link from "next/link";
import { Fragment, useState } from "react";
import { format } from "timeago.js";

import { getDataAPI, putDataAPI } from "../../utils/fetchData";
import { formatPrice, getTime } from "../../utils/formatData";

export default function Order({ data }) {
  const [order, setOrder] = useState(data);

  const handleChangeOrderStatus = async (status) => {
    const res = await putDataAPI(
      `/order/${order._id}`,
      { status: status },
      null
    );

    setOrder(res.order);
  };

  const handleDeleteOrder = async () => {
    if (confirm("Are you sure to delete this order?")) {
      const res = await putDataAPI(
        `/order/${order._id}?isDeleted=true`,
        null,
        null
      );

      setOrder(res.order);
    }
  };

  const handleRestoreOrder = async () => {
    if (confirm("Are you sure to restore this order?")) {
      const res = await putDataAPI(
        `/order/${order._id}?isDeleted=false`,
        null,
        null
      );

      setOrder(res.order);
    }
  };

  return (
    <div className="product order">
      <div className="productTitleContainer">
        {order.orderStatus !== "APPROVED" && order.isDeleted ? (
          <Fragment>
            <del style={{ color: "#d95087" }}>
              <h1 className="productTitle">Order: {order._id}</h1>
            </del>
            <button
              className="productRestoreButton"
              onClick={() => handleRestoreOrder()}
            >
              Restore
            </button>
          </Fragment>
        ) : (
          order.orderStatus !== "APPROVED" && (
            <Fragment>
              <h1 className="productTitle">Order: {order._id}</h1>
              <button
                className="productDeleteButton"
                onClick={() => handleDeleteOrder()}
              >
                Delete
              </button>
            </Fragment>
          )
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Order List:</h3>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          {order.orderList.map((item) => (
            <div key={item._id} className="productInfo">
              <div className="productInfoTop">
                <img src={`${item.image}`} alt="" className="productInfoImg" />
                <Link href={`/product/${item._id}`}>
                  <a>
                    <span className="productName">{item.title}</span>
                  </a>
                </Link>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">Quantity:</span>
                  <span className="productInfoValue">{item.quantity}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Price:</span>
                  <span className="productInfoValue">
                    {formatPrice(item.price)}円
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Order Info:</h3>
      </div>
      <div className="productBottom">
        <div className="customerInfoPaymentId ">
          <span className="customerBlockLabel">Payment ID: </span>
          <span>{order.paymentId}</span>
        </div>
        <div className="customerInfoContainer">
          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Customer name:</span>
            <span>{order.name}</span>
          </div>
          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Customer phone: </span>
            <span>{order.phone}</span>
          </div>
          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Customer email: </span>
            <span>{order.email}</span>
          </div>
          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Customer address: </span>
            <span>{order.address}</span>
          </div>
          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Order price: </span>
            <span>{formatPrice(order.amount)}円</span>
          </div>
          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Order status: </span>
            <span className={`status--${order.orderStatus}`}>
              {order.orderStatus}
            </span>
          </div>
          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Order time: </span>
            <span>
              {order.createdAt.slice(0, 10)} - {getTime(order.createdAt)} -{" "}
              {format(order.createdAt)}
            </span>
          </div>
          <div className="customerInfoBlock">
            <span className="customerBlockLabel">Order time update: </span>
            <span>
              {order.createdAt.slice(0, 10)} - {getTime(order.updatedAt)} -{" "}
              {format(order.updatedAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="buttons">
        {order.orderStatus === "PENDING" ? (
          <Fragment>
            <button
              className="declined"
              onClick={() => handleChangeOrderStatus("DECLINED")}
            >
              DECLINED
            </button>

            {!order.isDeleted && (
              <button
                className="approved"
                onClick={() => handleChangeOrderStatus("APPROVED")}
              >
                APPROVED
              </button>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {order.orderStatus !== "APPROVED" && !order.isDeleted && (
              <button
                className="approved"
                onClick={() => handleChangeOrderStatus("APPROVED")}
              >
                APPROVED
              </button>
            )}
            {order.orderStatus !== "DECLINED" && (
              <button
                className="declined"
                onClick={() => handleChangeOrderStatus("DECLINED")}
              >
                DECLINED
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await getDataAPI(`/order/${id}`, null);

  return {
    props: {
      data: res.order,
    },
  };
}
