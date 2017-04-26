import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
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
export default class Utility extends Component{
  componentDidMount() {
      if (Platform.OS == "android") {
       BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
     }
   }
   handleBackButton() {
       ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
      //  this.props.navigator.pop();
      //  return true;
   }
}
