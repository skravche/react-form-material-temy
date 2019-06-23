export const getUsers = fetch('http://localhost:3000/users');
export const getCountry = fetch('http://localhost:3000/countries');
export const getState = fetch('http://localhost:3000/states');
export const getCity = fetch('http://localhost:3000/cities');

// add to server
export const createUser = userData =>
  fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
