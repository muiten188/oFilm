import listFilmReducers from './listFilmReducers';
import filmDetailReducers from './filmDetailReducers';

import {combineReducers} from 'redux';

export default combineReducers({
  listFilmReducers,
	filmDetailReducers
});
