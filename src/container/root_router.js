'use strict';

import React, {
  Component,
} from 'react';

import {
  View,
  Navigator,
  Text,
  StatusBar,
} from 'react-native';
import { Router, Route, Scene, Animations, TabBar } from 'react-native-router-flux';
import ListFilm from '../component/listfilm/index';
import FilmDetail from '../component/filmdetail/film_detail';
import WatchScreen from '../component/filmdetail/watch_screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listFilmActions from '../actions/listfilm_actions';
import * as filmDetailActions from '../actions/film_detail_actions';
import * as watchScreenActions from '../actions/watch_screen_actions'
class RootRouter extends Component {
  constructor(props) {
    super(props);
  }
  renderScene(route, navigator) {
    var { state, actions } = this.props;
    var routeId = route.id;
    if (routeId === 'grid') {
      return (
        <ListFilm {...this.props}
          navigator={navigator} />
      );
    }
    if (routeId === 'FilmDetail') {
      return (
        <FilmDetail
          {...this.props}
          navigator={navigator}
          film={route.oFilm} />
      );
    }
    if (routeId === 'WatchFilm') {
      return (
        <WatchScreen
          {...this.props}
          navigator={navigator}
          episode={route.episode}
          filmDetail={route.filmDetail} />
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          style={{ flex: 1 }}
          initialRoute={{ id: 'grid', name: 'grid' }}
          renderScene={(this.renderScene.bind(this))}
        /></View>
    );
  }
}
export default connect((state) => ({
  listFilmReducers: state.listFilmReducers,
  filmDetailReducers: state.filmDetailReducers,
  watchScreenReducers: state.watchScreenReducers
}), (dispatch) => ({
  listFilmActions: bindActionCreators(listFilmActions, dispatch),
  filmDetailActions: bindActionCreators(filmDetailActions, dispatch),
  watchScreenActions: bindActionCreators(watchScreenActions, dispatch),
}))(RootRouter);
