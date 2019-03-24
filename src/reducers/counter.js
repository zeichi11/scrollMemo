import Constants from '../common/Constants';

// 초기 state
const initialState = {
    number: 0
};

export default function counter(state = initialState, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case Constants.action.INCREMENT:
            return {
                ...state,
                number: state.number + 1
            };
        case Constants.action.DECREMENT:
            return {
                ...state,
                number: state.number - 1
            };
        default:
            return state;
    }
};