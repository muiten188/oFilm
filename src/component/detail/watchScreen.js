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
import FilmPlayer from '../../general_Component/filmPlayer/filmPlayer';
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
     var initial = Orientation.getInitialOrientation();
     const { width , height } = Dimensions.get('window');
         if (initial === 'PORTRAIT') {
           this.reSetWindowSizeState(width, 230);
         } else {
           this.reSetWindowSizeState(width, height);
         }
     Orientation.addOrientationListener(this._orientationDidChange.bind(this));
  }
  componentWillUnmount() {
      if (Platform.OS == "android") {
      //  BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
      }
   }

   render(){
     console.log('width:'+this.state.videoWidth);
     console.log('heigt:'+this.state.videoHeight);
     const{episode, filmDetail}=this.props;
     return(
       <View style={{flex:1,flexDirection: 'column'}}>
         <StatusBar
          hidden={true}
          showHideTransition={'fade'}
          animated={true}
        />
          <FilmPlayer title="phim14.net" source={require("../../video/clip.mp4")}/>
       </View>
     )
   }
}
export default watch;
