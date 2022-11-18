import Link from "next/link";
import { format } from "timeago.js";

import { getTotal, formatPrice, getTime } from "../utils/formatData";

export default function WidgetLg({ orders }) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest orders</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Order Id</th>
            <th className="widgetLgTh">Payment Id</th>
            <th className="widgetLgTh">Order time</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.map((item) => (
            <tr key={item._id} className="widgetLgTr">
              <td className="widgetLgId">
                {item.isDeleted ? (
                  <del style={{ color: "#d95087" }}>
                    <Link href={`/order/${item._id}`}>
                      <a>{item._id}</a>
                    </Link>
                  </del>
                ) : (
                  <Link href={`/order/${item._id}`}>
                    <a>{item._id}</a>
                  </Link>
                )}
              </td>
              <td className="widgetLgPayment">{item.paymentId}</td>
              <td className="widgetLgDate">
                {item.createdAt.slice(0, 10)} - {getTime(item.createdAt)} -{" "}
                {format(item.createdAt)}
              </td>
              <td className="widgetLgAmount">
                {formatPrice(getTotal(item.orderList))}円
              </td>
              <td className="widgetLgStatus">
                <Button type={`${item.orderStatus}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
