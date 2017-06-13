import listFilmReducers from './containers/listfilm_reducers';
import filmDetailReducers from './containers/film_detail_reducers';
import watchScreenReducers from './containers/watch_screen_reducers';
import navigationReducer from './root_navigation/root_navigation_reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  listFilmReducers,
	filmDetailReducers,
  watchScreenReducers,
  navigationReducer
});
