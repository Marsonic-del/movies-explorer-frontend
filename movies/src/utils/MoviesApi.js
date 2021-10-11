class moviesApi {
    constructor({ address }) {
      this._address = address;
      this._headers = {
        'Content-Type': 'application/json',
      }
    }
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialMovies() {
      return fetch(`${this._address}`, {
        headers: this._headers,
      }).then(this._checkResponse);
    }
}
  
  export default moviesApi;