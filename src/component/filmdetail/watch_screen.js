import React, { Component } from 'react';
import {
  Stylesheet,
  Navigator,
  Text,
  View,
  StatusBar,
  ListView,
  ScrollView,
  Dimensions,
  Image,
  TouchableHighlight,
  Button,
  BackAndroid,
  Platform,
  ToastAndroid
} from 'react-native';
import FilmPlayer from '../../general_component/filmplayer/ofilmplayer';
import Orientation from 'react-native-orientation';
class watch extends Component {
  constructor(props) {
    super(props);
    const { width, height } = Dimensions.get('window');
    this.state = {
      videoWidth: width,
      videoHeight: height
    }
  }
  reSetWindowSizeState(width, height) {
    this.setState({
      videoWidth: width,
      videoHeight: height
    })
  }
  _orientationDidChange(orientation) {
    const { width, height } = Dimensions.get('window');
    if (orientation == 'LANDSCAPE') {
      this.reSetWindowSizeState(width, height);
    } else {
      this.reSetWindowSizeState(width, 230);
    }
  }
  componentDidMount() {
    if (Platform.OS == "android") {
      //  BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }
    var initial = Orientation.getInitialOrientation();
    const { width, height } = Dimensions.get('window');
    if (initial === 'PORTRAIT') {
      this.reSetWindowSizeState(width, 230);
    } else {
      this.reSetWindowSizeState(width, height);
    }
    Orientation.addOrientationListener(this._orientationDidChange.bind(this));
    //fecth data
    const { getLinkFilm } = this.props.watchScreenActions;
    getLinkFilm(this.props.episode);
  }

  render() {
    const { episode, filmDetail } = this.props;
    const { oLinkFilm } = this.props.watchScreenReducers;
    let linkFilm;
    if (oLinkFilm && oLinkFilm.link.length) {
      let oLink = oLinkFilm.link.filter(function (oLink) {
        return oLink.label == "Auto";
      })
      if (oLink.length > 0) {
        linkFilm = oLink[0].link;
      }
    }
    if (oLinkFilm && !oLinkFilm.link.length) {
      linkFilm = oLinkFilm.link;
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <StatusBar
          hidden={true}
          showHideTransition={'fade'}
          animated={true}
        />
        {
          linkFilm ? <FilmPlayer title="phim14.net" source={{ uri: linkFilm }} navigator={this.props.navigator}/> : null
        }
      </View>
    )
  }
}
export default watch;
