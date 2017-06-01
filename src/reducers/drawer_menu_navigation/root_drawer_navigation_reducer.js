import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as action_types from '../../constants/action_types';
import { RootDrawerNavigator } from '../../config/root_drawer_navigator_config';

const mainAction = RootDrawerNavigator.router.getActionForPathAndParams('Home');
const initialNavState = RootDrawerNavigator.router.getStateForAction(mainAction);
// const initialNavState = RootRouterContainer.router.getStateForAction(
//     mainAction,
//     0//index default 0
// );

function drawerNavigationReducer(state = initialNavState || {}, action = {}) {
    let nextState;
    switch (action.type) {
        case action_types.PUSH_ROUTE:
            nextState = state;
            break;
        default:
            nextState = RootDrawerNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}
export default drawerNavigationReducer;