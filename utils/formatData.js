export const formatPrice = (price) => {
  return price.toLocaleString().replace(".", ",");
};

export const getTotal = (cart) => {
  const total = cart.reduce((prev, item) => {
    return prev + item.price * item.quantity;
  }, 0);

  return total;
};

export const formatPaypalItems = (data) => {
  var items = [];
  var index = 1;

  for (var _id in data) {
    items.push({
      name: data[_id].title,
      sku: index.toString(),
      price: data[_id].price.toString(),
      currency: "JPY",
      quantity: data[_id].quantity,
    });

    index++;
  }

  return items;
};

export const getTime = (timestamp) => {
  const time = new Date(timestamp).toString().slice(16, 24);

  return time;
};
