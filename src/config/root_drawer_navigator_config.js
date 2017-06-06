import React, { Component } from 'react';
import { Button } from 'react-native';
import RootNavigationContainer from '../container/root_navigation_container';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import DrawerMenuItem from '../component/drawer_menu/drawer_menu_item';
import * as oFilmServer from './oFilmServer_config';
import { addNavigationHelpers } from 'react-navigation';


const CustomDrawerContentComponent = function (props) {
    return (
        <DrawerMenuItem ListServer={oFilmServer.ListServer} navigation={props.navigation} />
    )
};
const drawerNavigationConfig = {
    initialRouteName: 'Home',
    drawerPosition: 'right',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
        activeTintColor: '#e91e63',
    },
}

export const RootDrawerNavigator = DrawerNavigator({
    Home: {
        screen: RootNavigationContainer,
    },
}, drawerNavigationConfig);
