import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    addNavigationHelpers,
    StackNavigator,
} from 'react-navigation';
import * as navigationAction from '../actions/root_navigation_actions';
import AppWithNavigationState from '../component/root_router';


function mapStateToProps(state, props) {
    return {
        navigationReducer: state.navigationReducer,
    }
};
function mapToDispatch(dispatch) {
    return {
        navigationAction: bindActionCreators(navigationAction, dispatch),
    }
}

export default connect(mapStateToProps, mapToDispatch)(AppWithNavigationState);