import React, { Component } from 'react';
import RootNavigationContainer from '../container/root_navigation_container';
import { DrawerNavigator } from 'react-navigation';
import { Button } from 'react-native';
import DrawerMenu from '../component/drawer_menu/drawer_menu';
export const RootDrawerNavigator = DrawerNavigator({
    Home: {
        screen: RootNavigationContainer,
    },
    Notifications: {
        screen: DrawerMenu,
    },
});

