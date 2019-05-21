import Constants from '../common/Constants';

// 초기 state
const initialState = [
		{id: "00001", content: 'Test text0.'},
		{id: "00002", content: 'Test text1.'},
		{id: "00003", content: 'Test text2.'},
		{id: "00004", content: 'Test text3.'},
		{id: "00005", content: 'Test text4.'}
	];

export default function paragraph(state = initialState, action) {
	if (typeof state === 'undefined') {
		return initialState;

	}

	switch (action.type) {
		case Constants.action.INSERT_PARAGRAPH:
			return {
				...state,
				number: state.number + 1
			};
		case Constants.action.DELETE_PARAGRAPH:
			return {
				...state,
				number: state.number - 1
			};
		default:
			return state;
	}
};