import React from 'react';
import { Platform, BackAndroid, ToastAndroid } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { RootNavigationContainer } from '../config/root_navigation_config';

export default class AppWithNavigationState extends React.Component {
    //Life cycle component
    constructor(props) {
        super(props);
        this._handleBackAction = this.handleBackAction.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Danh Sách phim'
    };

    componentDidMount() {
        if (Platform.OS == "android") {
            BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
        }
    }

    componentWillUnmount() {
        if (Platform.OS == "android") {
            BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
        }
    }
    //component function
    handleBackAction() {
        if (Platform.OS == "android") {
            ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        }
        const { navigationAction } = this.props;
        const { navigationReducer } = this.props;
        if (navigationReducer.index > 0) {
            navigationAction.pop();
            return true;
        }
        else if (navigationReducer.index == 0) {
            return false
        }
    }

    render() {
        const { navigationAction, navigationReducer } = this.props;
        return (
            <RootNavigationContainer navigation={addNavigationHelpers({ navigationAction, state: navigationReducer })}/>
        );
    }
}