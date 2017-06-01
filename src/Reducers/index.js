import listFilmReducers from './listfilm_reducers';
import filmDetailReducers from './film_detail_reducers';
import watchScreenReducers from './watch_screen_reducers';
import drawerNavigationReducer from './root_drawer_navigation_reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  listFilmReducers,
	filmDetailReducers,
  watchScreenReducers,
  drawerNavigationReducer
});
