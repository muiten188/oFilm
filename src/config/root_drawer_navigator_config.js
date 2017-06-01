import React, { Component } from 'react';
import RootNavigationContainer from '../container/root_navigation_container';
import { DrawerNavigator } from 'react-navigation';
import { Button } from 'react-native';

class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Notifications' 
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home'
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

export const RootDrawerNavigator = DrawerNavigator({
    Home: {
        screen: RootNavigationContainer,
    },
    Notifications: {
        screen: MyNotificationsScreen,
    },
});

