import * as types from './actionTypes';
export function getFilmDetail(film) {
  var filmDetail=require('../mockData/filmDetail.json');
  filmDetail=filmDetail.filter(function(detail){
    return detail.FilmId==film.Id;
  })
  if (filmDetail.length >= 1) {
      filmDetail=filmDetail[0];
  }
  else{
      filmDetail={};
  }
  return {
    type: types.FETCHFILMDETAIL,
    filmDetail:filmDetail
  };
}

export function watch() {
  return {
    type: types.WATCH,
    id:2,
    message:"booboo"
  };
}
