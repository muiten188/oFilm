import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    Text,
    View,
    ListView,
    ScrollView,
    TouchableOpacity,
    Button,
    RefreshControl,
} from 'react-native';
import * as drawerMenuActions from "../../actions/drawer_menu_navigation/root_drawer_navigation_action";

class DrawerMenu extends React.Component {
    constructor(props) {
        super(props);
        debugger;
    }
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
function mapStateToProps(state, props) {
    return {
        drawerNavigationReducer: state.drawerNavigationReducer,
    }
};
function mapToDispatch(dispatch) {
    return {
        drawerMenuActions: bindActionCreators(drawerMenuActions, dispatch),
    }
}

export default connect(mapStateToProps, mapToDispatch)(DrawerMenu);