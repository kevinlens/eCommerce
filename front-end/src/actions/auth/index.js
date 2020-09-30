import { API } from '../../config';

export const signup = (user) => {
  // console.log(name, email, password);
  return fetch(`${API}/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    //convert 'user' object into json string
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  // console.log(name, email, password);
  return fetch(`${API}/auth/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    //convert 'user' object into json string
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//middleware
export const authenticate = (data, next) => {
  //if local storage does not have a 'jwt' then fill it up
  if (!localStorage.jwt) {
    localStorage.setItem('jwt', JSON.stringify(data));
    //pass the control onto the next middleware
    next();
  }
};

export const signout = (next) => {
  //if the local storage item 'jwt' exist then... wipe it clear
  if (localStorage.jwt) {
    localStorage.removeItem('jwt');
    //pass the control onto the next middleware
    next();
    return fetch(`${API}/auth/signout`, {
      method: 'GET',
    })
      .then((response) => {
        console.log('signout', response);
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (!localStorage.jwt) {
    return false;
  }else if (localStorage.jwt) {
    // return JSON.parse(localStorage.getItem('jwt'));
    return true
  } 
};
