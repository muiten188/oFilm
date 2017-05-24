import * as types from './action_types';

export function getLinkFilm(episode) {
  return (dispatch) => {
    fetch(`http://172.17.1.75:8080/oFilmSite/getWatchFilmUrl?url=${episode.EpisodeUrl}&name=phim14`, {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      }).then(function (responseJson) {

        if (responseJson.IsSuccess) {
          oLinkFilm = JSON.parse(responseJson.Data);
          dispatch(linkFilm(oLinkFilm));
        }
        else {
          //fail
        }
      });
    
  }
}

export function linkFilm(oLinkFilm){
    return {
        type: types.GETDIRECTLINKFILM,
        oLinkFilm
    }
}