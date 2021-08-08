
class Api {
  constructor({address, token}) {
  this._address = address; 
  this._token = token; 
  }

  _returnServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }


  getUserData() {
      return fetch(`${this._address}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
      .then((res) => this._returnServerResponse(res))
  }

  editProfile(data) {
    return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name
        })
    })
      .then((res) => this._returnServerResponse(res))
  }


  // req.user.id; не забыть про это 
  saveMovie(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  ) {
    return fetch(`${this._address}/movies`, {
      method: "POST",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailer,
          nameRU,
          nameEN,
          thumbnail,
          movieId,
      }),
  }).then((res) => this._returnServerResponse(res))
  }

  getSavedMovie() {
    return fetch(`${this._address}/movies`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._returnServerResponse(res))
  }

  deleteMovie(id) {
        return fetch(`${this._address}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
        .then((res) => this._returnServerResponse(res))
  }
}

const mainApi = new Api({
  address: 'https://api.sxep.nomoredomains.monster',
  token: `Bearer ${localStorage.token}`
});

export default mainApi;
