import React, { Component } from 'react';
var Orientation = require('react-native').NativeModules.Orientation;
var DeviceEventEmitter = require('react-native').DeviceEventEmitter;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontAwesome, { Icons } from 'react-native-fontawesome';
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
  TouchableOpacity,
  Button,
  BackAndroid,
  Platform,
  ToastAndroid
} from 'react-native';
import FilmPlayer from '../../general_component/filmplayer/ofilmplayer';
import * as watchScreenActions from "../../actions/component/watch_screen_actions";

class watch extends Component {
  static navigationOptions = {
    header: null
  }
  /*static navigationOptions = ({ navigation, screenProps }) => ({
    title: `Xem phim ${navigation.state.params.filmDetail.Name1}`,
    headerLeft: <TouchableOpacity style={{ width: 30, marginLeft: 10 }} onPress={() => { navigation.navigationAction.pop() }}>
      <FontAwesome>{Icons.chevronLeft}</FontAwesome>
    </TouchableOpacity>,
    headerVisible: false
  });*/
  constructor(props) {
    super(props);
    const { width, height } = Dimensions.get('window');
    this._fullScreen = true;
    this.state = {
      _fullScreen: false,
      videoWidth: width,
      videoHeight: height
    }
  }

  componentDidMount() {
    //fecth data
    const { episode } = this.props.navigation.state.params;
    const { getLinkFilm } = this.props.watchScreenActions;
    getLinkFilm(episode);
    DeviceEventEmitter.addListener("orientationDidChange", (body) => this._orientationDidChange(body));
  }

  _orientationDidChange(body) {
    if (body.orientation == "LANDSCAPE" && this.state._fullScreen == false) {
      this.setState({
        _fullScreen:true
      })
    }
    else if (body.orientation == "PORTRAIT" && this.state._fullScreen == true) {
      const { width, height } = Dimensions.get('window');
      this.setState({
        _fullScreen:false,
        videoWidth:width,
        videoHeight:(width * 9) / 16
      })
    }
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener("orientationDidChange");
  }

  reSetWindowSizeState(height) {
    this.setState({
      videoHeight: height
    })
  }

  navigationBack() {
    const { navigationAction } = this.props.navigation;
    navigationAction.pop();
  }

  test(event) {
    let { x, y, width, height } = event.nativeEvent.layout;
    // if (this._videoWidth != width && this._videoHeight != height && width <= height) {
    //   this._videoWidth = width;
    //   this._videoHeight = (width * 9) / 16;
    //   this.reSetWindowSizeState(this._videoHeight);
    // }
    // else if (this._videoWidth != width && this._videoHeight != height && width > height) {
    //   this.reSetWindowSizeState( "100%");
    // }
  }

  render() {
    const { oLinkFilm } = this.props.watchScreenReducers;
    let linkFilm;
    if (oLinkFilm && typeof (oLinkFilm.link) == "object") {
      let oLink = oLinkFilm.link.filter(function (oLink) {
        return oLink.label == "Auto";
      })
      if (oLink.length > 0) {
        linkFilm = oLink[0].link;
      }
    }
    if (oLinkFilm && typeof (oLinkFilm.link) == "string") {
      linkFilm = oLinkFilm.link;
    }
    return (
      <View style={[this.state._fullScreen ? { flex: 1 } : { width: '100%', height: this.state.videoHeight }, { flexDirection: 'column' }]}
        onLayout={(event) => this.test(event)}
      >
        <StatusBar
          hidden={true}
          showHideTransition={'fade'}
          animated={true}
        />
        {
          linkFilm ? <FilmPlayer title="phim14.net" onBack={() => this.navigationBack()} source={{ uri: linkFilm }} navigator={this.props.navigator} /> : null
        }
      </View>
    )
  }
}
function mapStateToProps(state, props) {
  return {
    watchScreenReducers: state.watchScreenReducers,
  }
};
function mapToDispatch(dispatch) {
  return {
    watchScreenActions: bindActionCreators(watchScreenActions, dispatch),
  }
}

export default connect(mapStateToProps, mapToDispatch)(watch);