import { combineReducers } from 'redux';
import paragraph from './paragraph';
import style from './style';
import selection from './selection';
import ui from './ui';

var document = {
	paragraph: [
		{id: "00001", content: 'Test text0.'},
		{id: "00002", content: 'Test text1.'},
		{id: "00003", content: 'Test text2.'},
		{id: "00004", content: 'Test text3.'},
		{id: "00005", content: 'Test text4.'}
	],
	style: {
		"00001": {
			// {type: "bold", offset:[2, 7]},
			// {type: "italic", offset:[5, 9]}
			//	=> 겹쳐지는 스타일은 모델 상에 존재할 수 없도록 선처리 후 저장해야함
			// 	=> {"bold" [2,4]}, {"bold, italic", [5,7], {"italic", [8,9]}}
			format: [
				{style: ["bold"], offset:[2, 4]},
				{style: ["bold", "italic"], offset:[5, 7]},
				{style: ["italic"], offset:[8, 9]}
			],
			lineHeight: 23,
		},
		"00002": {
			lineHeight: 23
		},
		"00003": {
			lineHeight: 23
		},
		"00004": {
			lineHeight: 23
		},
		"00005": {
			lineHeight: 23
		}
	},
	selection: {
		pos:{
			x:0,
			y:0,
			height:13
		},
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
		type: "Cursor"
	},
	test1:1,
	test2:2,
	test3:3,
	test4:4,
	test5:5
};

const reducers = combineReducers({
	paragraph,
	style,
	selection,
	ui
});

export default reducers;