import OrdersGrid from "../components/OrdersGrid";

import { getDataAPI } from "../utils/fetchData";

export default function orders({ orders }) {
  return (
    <div className="productList">
      <OrdersGrid data={orders} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getDataAPI("/order", null);

  return {
    props: {
      orders: res.orders,
    },
  };
}
