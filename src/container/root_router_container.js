import { connect } from 'react-redux';
import RootRouter from '../component/root_router';
import * as listFilmActions from '../actions/listfilm_actions';
import * as filmDetailActions from '../actions/film_detail_actions';
import * as watchScreenActions from '../actions/watch_screen_actions';
import { bindActionCreators } from 'redux';

export default connect((state) => ({
  listFilmReducers: state.listFilmReducers,
  filmDetailReducers: state.filmDetailReducers,
  watchScreenReducers: state.watchScreenReducers
}), (dispatch) => ({
  listFilmActions: bindActionCreators(listFilmActions, dispatch),
  filmDetailActions: bindActionCreators(filmDetailActions, dispatch),
  watchScreenActions: bindActionCreators(watchScreenActions, dispatch),
}))(RootRouter);
