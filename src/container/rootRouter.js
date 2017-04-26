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
import {Router, Route, Scene, Animations, TabBar} from 'react-native-router-flux';
import Grid from '../component/grid/index';
import FilmDetail from '../component/detail/filmDetail';
import WatchScreen from '../component/detail/watchScreen';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listFilmActions from '../actions/listFilmActions';
import * as filmDetailActions from '../actions/filmDetailActions'
class RootRouter extends Component {
	constructor(props) {
    super(props);
  }
 renderScene(route, navigator) {
    var {state,actions} = this.props;
    var routeId = route.id;
    if (routeId === 'grid') {
      return (
        <Grid {...this.props}
              navigator={navigator}/>
      );
    }
    if (routeId === 'FilmDetail') {
      return (
        <FilmDetail
                {...this.props}
                navigator={navigator}
                film={route.oFilm}/>
      );
    }
    if (routeId === 'WatchFilm') {
      return(
        <WatchScreen
          {...this.props}
          navigator={navigator}
          episode={route.episode}
          filmDetail={route.filmDetail}/>
      );
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Navigator
          style={{flex: 1}}
          initialRoute={{id: 'grid', name: 'grid'}}
          renderScene={(this.renderScene.bind(this))}
      /></View>
    );
  }
}
const mapStateToProps=(state,props) =>({
      listFilmReducers : state.listFilmReducers,
      filmDetailReducers : state.filmDetailReducers
})
const mapDispatchToProps=(dispatch)=>({
  listFilmActions:bindActionCreators(listFilmActions,dispatch),
  filmDetailActions:bindActionCreators(filmDetailActions,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(RootRouter);
