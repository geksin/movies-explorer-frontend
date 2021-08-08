

const BASE_URL = 'https://api.sxep.nomoredomains.monster';


export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {

    method: 'POST',
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)) 
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)) 
  .then((data) => {
      localStorage.setItem('token', data.token);
      return data;
  })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)) 
}
