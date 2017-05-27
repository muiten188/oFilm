import React, { Component } from 'react';
import {
  BackAndroid,
  NavigationExperimental,
  Text,
} from 'react-native';
const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;
export default class NavigationRoot extends Component {
  constructor(props) {
    super(props);
    
    this._renderScene = this._renderScene.bind(this);
    this._handleNavigate = this._handleNavigate.bind(this);
    this._handleBackAction = this._handleBackAction.bind(this);
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }
  _renderScene({ scene }) {
    const {
      index,
      navigationState,
    } = scene;
    // render your scene based on the route (navigationState)
    return <Text>Current route: {navigationState.key}</Text>;
  };
  _handleBackAction() {
    if (this.props.navigation.index === 0) {
      return false;
    }
    this.props.popRoute();
    return true;
  };
  _handleNavigate(action) {
    switch (action && action.type) {
    case 'push':
      this.props.pushRoute(action.payload);
      return true;
    case 'back':
    case 'pop':
      return this._handleBackAction();
    default:
      return false;
    }
  };
  render() {
    return (
      <NavigationCardStack
        direction='vertical'
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate}
        renderScene={this._renderScene}
      />
    );
  }
}