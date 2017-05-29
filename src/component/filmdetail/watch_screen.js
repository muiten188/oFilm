import React, { Component } from 'react';
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
import Orientation from 'react-native-orientation';
import * as watchScreenActions from "../../actions/watch_screen_actions";

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
    debugger;
    const { width, height } = Dimensions.get('window');
    this.state = {
      videoWidth: width,
      videoHeight: height
    }
  }
  
  componentDidMount() {
    var initial = Orientation.getInitialOrientation();
    const { width, height } = Dimensions.get('window');
    if (initial === 'PORTRAIT') {
      this.reSetWindowSizeState(width, 230);
    } else {
      this.reSetWindowSizeState(width, height);
    }
    //fecth data
    const { episode } = this.props.navigation.state.params;
    const { getLinkFilm } = this.props.watchScreenActions;
    getLinkFilm(episode);
  }

  componentWillUnmount() {
    
  }

  reSetWindowSizeState(width, height) {
    this.setState({
      videoWidth: width,
      videoHeight: height
    })
  }

  navigationBack(){
    const { navigationAction } = this.props.navigation;
    navigationAction.pop();
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
      <View style={{ width:this.state.videoWidth,height:this.state.videoHeight, flexDirection: 'column' }}>
        <StatusBar
          hidden={true}
          showHideTransition={'fade'}
          animated={true}
        />
        {
          linkFilm ? <FilmPlayer title="phim14.net" onBack={()=>this.navigationBack()} source={{ uri: linkFilm }} navigator={this.props.navigator} /> : null
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