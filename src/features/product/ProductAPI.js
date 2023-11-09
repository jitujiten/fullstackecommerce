// A mock function to mimic making an async request for data
export function fetchAllProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  // filter={"category":["smartphone","laptops"]}
  //sort={_sort:"price",_order:"desc"}  _sort=views&_order=asc
  // page={_page:1,limit:10}  _page=1&_limit=10
  let queryString = "";
  for (var key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValues = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValues}&`;
    }
  }
  //sort={_sort:"price",_order:"desc"}  _sort=views&_order=asc
  for (var key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  // page={_page:1,limit:10}  _page=1&_limit=10
  for (var key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}


export function fetchAllBrands(brands) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}



export function fetchAllCategory(category) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/category");
    const data = await response.json();
    resolve({ data });
  });
}


export function addProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products", {
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
    const response = await fetch("http://localhost:8080/products/"+product.id, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}


