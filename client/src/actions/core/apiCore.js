import queryString from 'query-string';

//in what way the product should be displayed and sent back
export const getProducts = (sortBy) => {
  return fetch(`/api/products/search/?sortBy=${sortBy}&order=desc&limit=3`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`/api/categories`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//used for the 'load more' products button
//used for radio buttons/checkboxes
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };

  return fetch(`/api/products/by/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    //convert 'data' object into json string
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//params is going to be the category id and the search
//used for listing user search products
export const list = (params) => {
  //this allows us to turn the 'params' into a query string for filtering
  const query = queryString.stringify(params);
  // console.log('query ', query);

  return fetch(`/api/products/listProductsByUserSearched/?${query}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const read = (productId) => {
  return fetch(`/api/products/${productId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelated = (productId) => {
  return fetch(`/api/products/related/${productId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get a generated braintree client token
export const getBraintreeClientToken = (userId, token) => {
  return fetch(`/api/braintree/getToken/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
  return fetch(`/api/braintree/payment/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
  return fetch(`/api/orders/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: createOrderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
