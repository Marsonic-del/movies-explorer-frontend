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
    /*.then((data) => {
        if(data) {
            authorize(password, email)
              .then((data) => {
                if(data.token) {
                  localStorage.setItem('jwt', data.token)
                  return data
                  }
                })
              .catch((err) => {console.log(err)})
        }
    })*/
  };