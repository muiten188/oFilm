import * as types from '../../constants/action_types';
const initState = {
  isLoading: true
};
export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.LIST_FILM:
      let listFilm = action.oListFilm;
      return {
        ...state,
        listFilm,
        isLoading: false
      };
    default:
      return state;

  }
}
