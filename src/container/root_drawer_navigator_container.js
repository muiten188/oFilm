import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    addNavigationHelpers,
    StackNavigator,
} from 'react-navigation';
import * as drawerNavigationAction from '../actions/drawer_menu_navigation/root_drawer_navigation_action';
import * as navigationAction from '../actions/root_navigation/root_navigation_actions';
import RootDrawerNavigation from '../component/root_drawer_navigation';

function mapStateToProps(state, props) {
    return {
        drawerNavigationReducer: state.drawerNavigationReducer,
        navigationReducer: state.navigationReducer,
    }
};
function mapToDispatch(dispatch) {
    return {
        drawerNavigationAction: bindActionCreators(drawerNavigationAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch),
    }
}

export default connect(mapStateToProps, mapToDispatch)(RootDrawerNavigation);