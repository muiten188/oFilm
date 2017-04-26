import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import educers from '../Reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(educers);

import Grid from '../component/grid';
import RootRouter from './rootRouter';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      bach:true
    }
  }
  render() {
    return (
      <Provider store={store}>
        <RootRouter name="asda" />
      </Provider>
    );
  }
}
