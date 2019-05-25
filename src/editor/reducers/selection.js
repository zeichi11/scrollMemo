import Constants from '../common/Constants';

// 초기 state
const initialState = {
	top: 0,
	left: 0,
	height: 0,
	anchorNode: null,
	anchorOffset: -1,
	baseNode: null,
	baseOffset: -1,
	extentNode: null,
	extentOffset: -1,
	focusNode: null,
	focusOffset: -1,
	isCollapsed: false,
	rangeCount: 0,
	reverse: false,
	type: "Cursor"
};

export default function style(state = initialState, action) {
	if (typeof state === 'undefined') {
		return initialState;

	}

	switch (action.type) {
		case Constants.action.UPDATE_SELECTION:
			return {
				...state,
				top: action.top,
				left: action.left,
				height: action.height
			};
		case Constants.action.UPDATE_ANCHOR:
			return {
				...state,
				anchorNode: action.node,
				anchorOffset: action.offset
			};
		case Constants.action.UPDATE_EXTENT:
			return {
				...state,
				extentNode: action.node,
				extentOffset: action.offset
			};
		case Constants.action.UPDATE_SELECTION_TYPE:
			return {
				...state,
				reverse: action.reverse,
				type: action.selectionType
			};
		default:
			return state;
	}
};