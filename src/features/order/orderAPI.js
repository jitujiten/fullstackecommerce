export function addOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrder(sort,pagination) {
  let queryString = "";

  for (var key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  for (var key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/orders?" + queryString);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}


export function UpdateOneOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/"+order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}