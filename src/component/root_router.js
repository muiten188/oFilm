'use strict';

import React, {
  Component,
} from 'react';

import {
  View,
  Navigator,
  Text,
  StatusBar,
  Platform,
  BackAndroid,
  ToastAndroid
} from 'react-native';
import ListFilm from './listfilm/index';
import FilmDetail from './filmdetail/film_detail';
import WatchScreen from './filmdetail/watch_screen';

class RootRouter extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'grid') {
      return (
        <ListFilm {...this.props}
          navigator={navigator}
          popCallBack={route.popCallBack} />
      );
    }
    if (routeId === 'FilmDetail') {
      return (
        <FilmDetail
          {...this.props}
          navigator={navigator}
          film={route.oFilm}
          popCallBack={route.popCallBack} />
      );
    }
    if (routeId === 'WatchFilm') {
      return (
        <WatchScreen
          {...this.props}
          navigator={navigator}
          episode={route.episode}
          filmDetail={route.filmDetail}
          popCallBack={route.popCallBack} />
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          ref={(navigation) => { this._navigation = navigation; }}
          style={{ flex: 1 }}
          initialRoute={{ id: 'grid', name: 'grid' }}
          renderScene={(this.renderScene.bind(this))}
        /></View>
    );
  }
}
export default RootRouter;