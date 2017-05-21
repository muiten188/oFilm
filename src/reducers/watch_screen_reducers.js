import * as types from '../actions/action_types';
const initState = {
    isLoading: true
};
export default function (state = initState, action = {}) {
    switch (action.type) {
        case types.GETDIRECTLINKFILM:
            let oLinkFilm = action.oLinkFilm;
            return {
                ...state,
                oLinkFilm,
                isLoading: false
            };
        default:
            return state;

    }
}
