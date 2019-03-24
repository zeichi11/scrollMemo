import Constants from '../common/Constants';

export function increment() {
    return {
        type: Constants.action.INCREMENT
    };
}

export function decrement() {
    return {
        type: Constants.action.DECREMENT
    };
}

export function setColor(color) {
    return {
        type: Constants.action.SET_COLOR,
        color: color
    }
}