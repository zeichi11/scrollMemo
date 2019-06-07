import Constants from '../common/Constants';

// 초기 state
const initialState = {
	"00001": {
		// {type: "bold", offset:[2, 7]},
		// {type: "italic", offset:[5, 9]}
		//	=> 겹쳐지는 스타일은 모델 상에 존재할 수 없도록 선처리 후 저장해야함
		// 	=> {"bold" [2,4]}, {"bold, italic", [5,7], {"italic", [8,9]}}
		format: [
			{style: [], length: 2, offset:[0, 2]},
			{style: ["bold"], offset:[2, 4]},
			{style: [], offset:[4, 5]},
			{style: ["bold", "italic"], offset:[5, 7]},
			{style: [], offset:[7, 8]},
			{style: ["italic"], offset:[8, 9]},
			{style: ["italic"], offset:[9, 11]}
		],
		lineHeight: 0
	},
	"00002": {
		lineHeight: 0
	},
	"00003": {
		lineHeight: 0
	},
	"00004": {
		lineHeight: 0
	},
	"00005": {
		lineHeight: 0
	}
};

export default function style(state = initialState, action) {
	if (typeof state === 'undefined') {
		return initialState;

	}

	switch (action.type) {
		case Constants.action.INSERT_FORMAT:
			return {
				...state,
				number: state.number + 1
			};
		case Constants.action.DELETE_FORMAT:
			return {
				...state,
				number: state.number - 1
			};
		case Constants.action.UPDATE_LINE_HEIGHT:
			return {
				...state,
				[action.id]: {
					...state[action.id],
					lineHeight: action.height
				}
			};
		case Constants.action.UPDATE_SPAN:
			return {

			};
		default:
			return state;
	}
};