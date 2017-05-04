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
  //method
  reSetWindowSizeState(width, height){
    this.setState({
      videoWidth:width,
      videoHeight:height
    })
  }
  _handleBack() {
       ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
       this.props.navigator.pop();
   }
  _orientationDidChange(orientation) {
    const { width , height } = Dimensions.get('window');
    if (orientation == 'LANDSCAPE') {
      this.reSetWindowSizeState(width, height);
    } else {
      this.reSetWindowSizeState(width, 230);
    }
  }
  //component react
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
          <FilmPlayer title="phim14.net" onBack={this._handleBack.bind(this)} source={{uri:'https://r7---sn-42u-i5oee.googlevideo.com/videoplayback?id=b2b78267a8f8b3ce&itag=22&source=webdrive&requiressl=yes&ttl=transient&pl=24&ei=ysYKWfu_BYrXqQXN07jQCQ&mime=video/mp4&lmt=1493432571913999&ip=42.112.212.2&ipbits=0&expire=1493892874&sparams=ei,expire,id,ip,ipbits,itag,lmt,mime,mm,mn,ms,mv,pcm2cms,pl,requiressl,source,ttl&signature=6E16B18E8462393EBEA48C69B7827B782BFFDCD5.569C34A7A938083534C3A7C884CF90E1539DE6A3&key=cms1&app=explorer&cms_redirect=yes&mm=31&mn=sn-42u-i5oee&ms=au&mt=1493885482&mv=m&pcm2cms=yes'}}/>
       </View>
     )
   }
}
export default watch;
