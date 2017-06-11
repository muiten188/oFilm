import React from 'react';
import { Platform, BackAndroid, ToastAndroid } from 'react-native';
import { RootRouterContainer } from '../config/root_navigation_config';
import { RootDrawerNavigator } from '../config/root_drawer_navigator_config';
import { addNavigationHelpers } from 'react-navigation';
export default class AppWithNavigationState extends React.Component {
    //Life cycle component
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //TODO
    }

    componentWillUnmount() {
        //TODO
    }

    render() {
        return (
            <RootDrawerNavigator />
        );
    }
}