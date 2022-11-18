import { ArrowDownward, ArrowUpward, ArrowForward } from "@material-ui/icons";
import { useEffect, useState } from "react";

import { formatPrice } from "../utils/formatData";

export default function FeaturedInfo({ chartData }) {
  const date = new Date();
  const month = date.getMonth() + 1;

  const thisMonth = chartData[month - 1];
  const lastMonth = chartData[month - 2];

  const [direction, setDirection] = useState("down");
  const [total, setTotal] = useState(0);

  const [revenue, setRevenue] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setRevenue(thisMonth.Revenue - lastMonth.Revenue);
    setPercent(
      ((thisMonth.Revenue === 0 ? 100 : thisMonth.Revenue) * 100) /
        lastMonth.Revenue -
        100
    );

    if (thisMonth.Order > lastMonth.Order) setDirection("up");
    if (thisMonth.Order === lastMonth.Order) setDirection("forward");
    setTotal(thisMonth.Order - lastMonth.Order);
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {thisMonth.Month}: {formatPrice(thisMonth.Revenue)}円
          </span>
          <span
            className={`featuredMoneyRate ${
              revenue < 0 ? "decrease" : "increase"
            }`}
          >
            <span className="revenue">{formatPrice(revenue)}円</span>
            <span className="percent">{Math.floor(percent)} %</span>
            {percent === 0 ? (
              <ArrowForward className="featuredIcon forward" />
            ) : percent < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon " />
            )}
          </span>
        </div>
        <span className="featuredSub">
          Compared to last month {lastMonth.Month}{" "}
          {formatPrice(lastMonth.Revenue)}円
        </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Order Summary</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {thisMonth.Month}: {thisMonth.Order} order
          </span>
          <span
            className={`featuredMoneyRate ${
              total < 0 ? "decrease" : "increase"
            }`}
          >
            <span className="order">{total} order</span>
            {direction === "forward" ? (
              <ArrowForward className="featuredIcon forward" />
            ) : direction === "down" ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon " />
            )}
          </span>
        </div>
        <span className="featuredSub">
          Compared to last month {lastMonth.Month} {lastMonth.Order} order
        </span>
      </div>
    </div>
  );
}
