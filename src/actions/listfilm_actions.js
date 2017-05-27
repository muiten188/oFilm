import * as types from './action_types';


export function refreshListFilm() {
  return (dispatch) => {
    dispatch(getListFilm());
  }
}
export function getListFilm() {
  return (dispatch) => {
    let oListFilm;
    fetch('http://192.168.1.111:8080/oFilmSite/getListFilm?url=https://phim14.net&name=phim14', {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      }).then(function (responseJson) {

        if (responseJson.IsSuccess) {
          oListFilm = JSON.parse(responseJson.Data);
          dispatch(listFilm(oListFilm));
        }
        else {
          //fail
        }
      });
  }
}
export function listFilm(oListFilm) {
  return {
    type: types.LIST_FILM,
    oListFilm
  }
}
