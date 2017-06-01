import listFilmReducers from './component/listfilm_reducers';
import filmDetailReducers from './component/film_detail_reducers';
import watchScreenReducers from './component/watch_screen_reducers';
import drawerNavigationReducer from './drawer_menu_navigation/root_drawer_navigation_reducer';
import navigationReducer from './root_navigation/root_navigation_reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  listFilmReducers,
	filmDetailReducers,
  watchScreenReducers,
  drawerNavigationReducer,
  navigationReducer
});
