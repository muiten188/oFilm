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
import reducers from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
import RootRouterContainer from './root_router_container';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <RootRouterContainer />
      </Provider>
    );
  }
}
