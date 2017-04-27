import React, { Component } from 'react';
import {
  Stylesheet,
  Navigator,
  Text,
  View,
  ListView,
  ScrollView,
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
  }
  componentWillMount() {

  }
  _orientationDidChange(orientation) {
    console.log(orientation);
    if (orientation == 'LANDSCAPE') {
      //do something with landscape layout
    } else {
      //do something with portrait layout
    }
  }
  componentDidMount() {
      if (Platform.OS == "android") {
      //  BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
     }
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
          <FilmPlayer />
       </View>
     )
   }
}
export default watch;
