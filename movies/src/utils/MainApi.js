export const BASE_URL = 'https://za-kulisami.nomoredomains.monster';

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${ res.status }`);
  }
  
  // Запрос на аутентификацию
export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email })
    })
    
    .then((res) => checkResponse(res))
  };

  // Запрос на регистрацию.
export const register = (name, password, email) => {
    return fetch(`${ BASE_URL }/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password, email })
    })
    .then((res) => checkResponse(res))
  };

export const editProfile = (data, token) => {
    return fetch(`${ BASE_URL }/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
      .then((res) => checkResponse(res))
  }

  export const saveMovie = (movie, token) => {
    console.log(JSON.stringify(movie))
    return fetch(`${ BASE_URL }/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then((res) => checkResponse(res))
  }

  export const removeMovie = (movieId, token) => {
    return fetch(`${ BASE_URL }/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => checkResponse(res))
  }

  // Для получения данных пользователя если токен с localStorage тот же что 
  // и на сервере.
  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    .then((res) => checkResponse(res))
  };

  export const getSavedMovies = (token) => {
    return fetch(`${BASE_URL}/movies`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    .then((res) => checkResponse(res))
  };