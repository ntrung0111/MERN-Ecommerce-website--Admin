import OrderChart from "../components/OrderChart";
import FeaturedInfo from "../components/FeaturedInfo";
import Widget from "../components/Widget";

import { getDataAPI } from "../utils/fetchData";

export default function Home({ orders, chartData }) {
  return (
    <div className="home">
      <FeaturedInfo chartData={chartData} />
      <OrderChart
        chartData={chartData}
        title="Order Analytics"
        orders={orders}
      />
      <div className="homeWidgets">
        <Widget orders={orders} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const chartData = [
    {
      _id: 1,
      Month: "Jan",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 2,
      Month: "Feb",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 3,
      Month: "Mar",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 4,
      Month: "Apr",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 5,
      Month: "May",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 6,
      Month: "Jun",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 7,
      Month: "Jul",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 8,
      Month: "Agu",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 9,
      Month: "Sep",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 10,
      Month: "Oct",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 11,
      Month: "Nov",
      Order: 0,
      Revenue: 0,
    },
    {
      _id: 12,
      Month: "Dec",
      Order: 0,
      Revenue: 0,
    },
  ];

  const res = await getDataAPI("/order", null);

  for (let i = 0; i < res.chartData.length; i++) {
    let index = res.chartData[i]._id;

    if (index === chartData[index - 1]._id) {
      chartData[index - 1].Order = res.chartData[i].order;
      chartData[index - 1].Revenue = res.chartData[i].revenue;
    }
  }

  return {
    props: {
      orders: res.ordersHome,
      chartData,
    },
  };
}
