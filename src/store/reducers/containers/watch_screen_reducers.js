import * as types from '../../constants/action_types';
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
        case types.RESETWATCHSCEENSTATE:
            return initState;
        default:
            return state;

    }
}
