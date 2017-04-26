import * as types from '../actions/actionTypes';
import * as actions from '../actions/actions';
const initState={};

export default function(state = initState, action = {}){
  switch(action.type){
    case types.WATCH:
      console.log(action);
      console.log(state);
      debugger;
      return{
      ...state,
        action
      };
    case types.FETCHFILMDETAIL:
      console.log(action);
      console.log(state);
      return{
      ...state,
      filmDetail:action.filmDetail
      };
    default:
    return state;
  }
}
