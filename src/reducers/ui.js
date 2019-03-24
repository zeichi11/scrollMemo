import Constants from '../common/Constants';

// 초기 state
const initialState = {
    color: [255, 255, 255]
};

export default function uiReducer(state = initialState, action) {
    if (action.type === Constants.action.SET_COLOR) {
        return {
            color: action.color
        };
    }

    return state;
}