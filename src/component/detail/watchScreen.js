import React, { Component } from 'react';
import {
  Stylesheet,
  Navigator,
  Text,
  View,
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
import FilmPlayer from '../../container/filmPlayer';
import Orientation from 'react-native-orientation';
class watch extends Component{
  constructor(props){
    super(props);
    const { width , height } = Dimensions.get('window');
    this.state = {
      videoWidth:width,
      videoHeight:height
    }
  }
  componentWillMount() {
    var initial = Orientation.getInitialOrientation();
    const { width , height } = Dimensions.get('window');
        if (initial === 'PORTRAIT') {
          this.reSetWindowSizeState(width, 230);
        } else {
          this.reSetWindowSizeState(width, height);
        }
  }
  reSetWindowSizeState(width, height){
    this.setState({
      videoWidth:width,
      videoHeight:height
    })
  }
  _orientationDidChange(orientation) {
    const { width , height } = Dimensions.get('window');
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
     Orientation.addOrientationListener(this._orientationDidChange.bind(this));
  }
  componentWillUnmount() {
      if (Platform.OS == "android") {
      //  BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
      }
   }

   render(){
     const{episode, filmDetail}=this.props;
     return(
       <View style={{flex:1,flexDirection: 'column'}}>
          <FilmPlayer paused={true} videoWidth={this.state.videoWidth} videoHeight={this.state.videoHeight}/>
       </View>
     )
   }
}
export default watch;
