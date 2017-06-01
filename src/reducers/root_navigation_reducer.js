import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as action_types from '../actions/action_types';
import { RootRouterContainer } from '../config/root_navigation_config';

const mainAction = RootRouterContainer.router.getActionForPathAndParams('ListFilm');
const initialNavState = RootRouterContainer.router.getStateForAction(mainAction);
// const initialNavState = RootRouterContainer.router.getStateForAction(
//     mainAction,
//     0//index default 0
// );

function navigationReducer(state = initialNavState || {}, action = {}) {
    let nextState;
    switch (action.type) {
        case action_types.PUSH_ROUTE:
            switch (action.route.id) {
                case "FilmDetail":
                    nextState = RootRouterContainer.router.getStateForAction(
                        NavigationActions.navigate({
                            routeName: action.route.id,
                            params: { oFilm: action.route.oFilm },
                            action: NavigationActions.navigate({ routeName: action.route.id })
                        }),
                        state);
                    break;
                case "WatchFilm":
                    nextState = RootRouterContainer.router.getStateForAction(
                        NavigationActions.navigate({
                            routeName: action.route.id,
                            params: { episode: action.route.episode, filmDetail: action.route.filmDetail },
                            action: NavigationActions.navigate({ routeName: action.route.id })
                        }),
                        state);
                    break;
                default:
                    nextState = RootRouterContainer.router.getStateForAction(
                        NavigationActions.navigate({ routeName: action.route.id }),
                        state);
                    break;
            }
            break;
        case action_types.POP_ROUTE:
            nextState = RootRouterContainer.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        default:
            nextState = RootRouterContainer.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}
export default navigationReducer;