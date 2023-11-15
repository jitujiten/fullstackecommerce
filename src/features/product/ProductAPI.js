export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination, admin) {
  // filter={"category":["smartphone","laptops"]}
  //sort={_sort:"price",_order:"desc"}  _sort=views&_order=asc
  // page={_page:1,limit:10}  _page=1&_limit=10
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  //sort={_sort:"price",_order:"desc"}  _sort=views&_order=asc
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  // page={_page:1,limit:10}  _page=1&_limit=10
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/products?" + queryString);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}

export function fetchAllBrands(brands) {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllCategory(category) {
  return new Promise(async (resolve) => {
    const response = await fetch("/category");
    const data = await response.json();
    resolve({ data });
  });
}

export function addProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function EditProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + product.id, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}
