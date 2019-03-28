// import config from 'config';
import decode from 'jwt-decode'
import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    loggedIn,
    getAll
};


let api_url = 'http://localhost:3000'


//  Login
function login(username, password) {

  return fetch(api_url + `/users/login?user[username]=${username}&user[password]=${password}`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    })
    .then(handleResponse)
    .then(user => {
      // setToken(res.token)
      // return res
        // login successful if there's a user in the response
        if (user.status === 401) {
          alert('Wrong username or password')

        } else {
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('user', JSON.stringify(user.user.username));
          localStorage.setItem('token', JSON.stringify(user.token))
        }

        return user;
    });
}

// Check if user is logged in
function loggedIn() {
  const token = getToken()
  return !!token && !this.isTokenExpired(token)
}

//  Check if token is expired
function isTokenExpired(token) {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
    }
    else
        return false;
  }
  catch (err) {
      return false;
  }
}

// Set Token in local storate
function setToken(token) {
  localStorage.setItem('id_token', token)
}

function getToken() {
  return localStorage.getItem('token')
}

function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}



function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(api_url + `/users`, requestOptions).then(handleResponse);
}

function register(user) {
  fetch(api_url + '/users/register',
    {
      body: JSON.stringify(user),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  )
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });


}
