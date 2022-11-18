import { Fragment, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import OrdersGrid from "./OrdersGrid";

import { getDataAPI } from "../utils/fetchData";
import { formatPrice } from "../utils/formatData";

export default function Chart({ title, chartData, id, orders }) {
  const [data, setData] = useState(chartData);
  const [ordersData, setOrdersData] = useState(orders);
  const [datePicker, setDatePicker] = useState({
    startDate: "",
    endDate: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip">
          <p className="tooltipLabel">
            {datePicker.startDate && datePicker.endDate
              ? `Date: ${label}`
              : label}
          </p>
          <p className="tooltipOrder">
            Order: {`${payload[0].payload?.Order}`}
          </p>
          <p className="tooltipRevenue">
            Sold: {formatPrice(payload[0]?.payload?.Sold)}
          </p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    const getNewAnalytics = async () => {
      const res = await getDataAPI(
        `/product/${id}?startDate=${datePicker.startDate}&endDate=${datePicker.endDate}`,
        null
      );

      setData(res.chartData);
      setOrdersData(res.orders);
      setIsOpen(false);
    };

    if (datePicker.startDate.length > 0 && datePicker.endDate.length > 0) {
      getNewAnalytics();
    } else {
      setData(chartData);
    }
  }, [datePicker]);

  const handleChangeDatePicker = (e) => {
    const { name, value } = e.target;
    setDatePicker({ ...datePicker, [name]: value });
  };

  return (
    <Fragment>
      <div className="chart">
        <h3 className="chartTitle">{title}</h3>
        <div className="datePickerContainer">
          <div className="item">
            <label htmlFor="startDate">Start date: </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleChangeDatePicker}
            />
          </div>

          <div className="item">
            <label htmlFor="endDate">End date: </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleChangeDatePicker}
            />
          </div>
        </div>
        {datePicker.startDate && datePicker.endDate ? (
          <Fragment>
            {data.map((item) => (
              <div key={item._id}>
                <p className="monthTitle">
                  {process.env.MONTHS[item._id - 1]} - {item.year}
                </p>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                  <LineChart
                    data={item.values}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis
                      dataKey="Order"
                      type="number"
                      allowDecimals={false}
                      stroke="#8884d8"
                    />
                    <Line type="monotone" dataKey="Order" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Sold" stroke="#82ca9d" />
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </Fragment>
        ) : (
          <Fragment>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="Month" />
                <YAxis dataKey="Sold" type="number" allowDecimals={false} />
                <Line type="monotone" dataKey="Order" stroke="#8884d8" />
                <Line type="monotone" dataKey="Sold" stroke="#82ca9d" />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid stroke="#e0dfdf" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </Fragment>
        )}
      </div>
      <div className="viewDetail">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          View Detail
        </button>
      </div>
      {isOpen && <OrdersGrid data={ordersData} />}
    </Fragment>
  );
}
