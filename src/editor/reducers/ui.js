import Constants from '../common/Constants';

// 초기 state
const initialState = {
	'selection': {
		'flicker': false
	}
};

export default function style(state = initialState, action) {
	if (typeof state === 'undefined') {
		return initialState;

	}

	switch (action.type) {
		case Constants.action.UI_UPDATE_SELECTION_FLICKER:
			if (!action.flicker) {
				console.log("aaa");
			}
			return {
				...state,
				selection: {
					flicker: action.flicker
				}
			};
		default:
			return state;
	}
};