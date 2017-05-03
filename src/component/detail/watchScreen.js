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
          <FilmPlayer title="phim14.net" source={{uri:'https://r7---sn-8pxuuxa-i5oe6.googlevideo.com/videoplayback?id=c813e9abd790186a&itag=22&source=webdrive&requiressl=yes&ttl=transient&pl=20&ei=isoJWYfLF43HqAWVurZ4&mime=video/mp4&lmt=1493691606283840&ip=116.111.125.185&ipbits=0&expire=1493828298&sparams=ei,expire,id,ip,ipbits,itag,lmt,mime,mm,mn,ms,mv,pl,requiressl,source,ttl&signature=3CF880954E0832F342B7C641B51256A7B22B525C.82EB20E21C9545BCAE17B5D5C92D5CAFA71F2131&key=cms1&app=explorer&cms_redirect=yes&mm=31&mn=sn-8pxuuxa-i5oe6&ms=au&mt=1493821646&mv=m'}}/>
       </View>
     )
   }
}
export default watch;
