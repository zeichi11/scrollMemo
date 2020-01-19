import React from 'react';
import Editor from './Editor';
import { connect, bindActionCreators } from 'react-redux';
import * as actions from './actions';

const mapStateToProps = (state) => {
	// 여기서 사용되는 state는 컴포넌트의 state와 다름, 파라미터 이름이 state
	return {
		// props가 state의 어떠한 값으로 연결될지 정한다.
		// number라는 props를 redux state의 counter 안에 있는 number 값으로 연결
		paragraphs: state.paragraph,
		// color props는 state의 ui의 color와 연결
		styles: state.style,
		selection: state.selection,
		ui: state.ui
	}
};

// dispatch 관련 함수들을 props로 설정한 함수
const mapDispatchToProps = (dispatch) => {
	// action을 dispatch하는 함수를 props로 연결함
	return {
		// actions.increment() (action 생성함수)에서 만든 action을 dispatch
		// handleIncrement props를 실행하면 dispatch(increment)가 실행
		updateLineHeight: (id, height) => {dispatch(actions.updateLineHeight(id, height))},
		insertParagraph: () => {dispatch(actions.insertParagraph())},
		updateParagraph: () => {dispatch(actions.updateParagraph())},
		deleteParagraph: () => {dispatch(actions.deleteParagraph())},

		insertText: (pId, offset, value) => {dispatch(actions.insertText(pId, offset, value))},
		updateText: (pId, offset, value) => {dispatch(actions.updateText(pId, offset, value))},
		deleteText: (pId, offset) => {dispatch(actions.deleteText(pId, offset))},

		insertFormat: () => {dispatch(actions.insertFormat())},
		updateFormat: () => {dispatch(actions.updateFormat())},
		deleteFormat: () => {dispatch(actions.deleteFormat())},

		// updateSelection: (top, left, height) => {dispatch(actions.updateSelection(top, left, height))},
		updateAnchor: (node, offset) => {dispatch(actions.updateAnchor(node, offset))},
		updateExtent: (node, offset, flicker) => {dispatch(actions.updateExtent(node, offset, flicker))},
		updateSelectionType: (selectionType, isReverse) => {dispatch(actions.updateSelectionType(selectionType, isReverse))},

		// update ui
		updateUISelectionFlicker: (flicker) => {dispatch(actions.updateUISelectionFlicker(flicker))}
	}

	//
	// return bindActionCreators(actions, dispatch);
	// // bindActionCreators를 사용하면 아래와 같이 할 수 있으나
	// // 함수명이 자동으로 생성됨(action 생성함수 이름과 동일)
	//
};

// connect() : 컴포넌트를 redux에 연결한 또다른 함수를 반환(redux에 연결된 Editor 컴포넌트를 반환)
const EditorContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Editor);

export default EditorContainer;