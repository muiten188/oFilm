  import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import storeConfig from '../store/store_config';


import RootDrawerNavigationContainer from './root_drawer_navigator_container';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      store:{}
    }
  }
  
  componentDidMount(){
    storeConfig(store=> this.setState({store}))
  }

  render() {
    return (
      <Provider store={store}>
        <RootDrawerNavigationContainer />
      </Provider>
    );
  }
}
