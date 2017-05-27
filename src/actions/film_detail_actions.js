import * as types from './action_types';
export function getFilmDetail(film) {
  return dispatch => {
    let oFilmDetail;
    fetch(`http://192.168.1.111:8080/oFilmSite/getFilmDetail?url=${film.Url}&name=phim14`, {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function (responseJson) {
      if (responseJson.IsSuccess) {
        oFilmDetail = JSON.parse(responseJson.Data);
        dispatch(filmDetail(oFilmDetail));
      }
      else {
        //fail
      }
    });
  }
}

export function filmDetail(oFilmDetail) {
  return {
    type: types.FETCHFILMDETAIL,
    filmDetail: oFilmDetail
  };
}

export function watch() {
  return {
    type: types.WATCH
  };
}
export function resetState() {
  return {
    type: types.RESETSTATE
  };
}