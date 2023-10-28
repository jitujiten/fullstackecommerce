// A mock function to mimic making an async request for data
export function fetchAllProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort) {
  // filter={"category":["smartphone","laptops"]}
 
  let queryString = "";
  for (var key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValues = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValues}&`;
    }
  }
  //sort={_sort:"price",_order:"desc"}
  //_sort=views&_order=asc
  for (var key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
