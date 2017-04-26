import * as types from './actionTypes';


export function refreshListFilm() {
  return (dispatch)=>{
    dispatch(getListFilm());
  }
}
export function getListFilm(){
  return(dispatch)=>{
    var oListFilm = require('../mockData/listFilm.json');
    dispatch(listFilm(oListFilm));
  }
}
export function listFilm(oListFilm){
  return {
    type : types.LIST_FILM,
    oListFilm
  }
}
