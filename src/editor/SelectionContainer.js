import React from 'react';
import { connect, bindActionCreators } from 'react-redux';
import Selection from './components/Selection';
// import * as actions from './actions';

const mapStateToProps = (state) => {
	return {
		paragraphs: state.paragraph,
		styles: state.style,
		ui: state.ui.selection,

		anchorNode: state.selection.anchorNode,
		anchorOffset: state.selection.anchorOffset,
		extentNode: state.selection.extentNode,
		extentOffset: state.selection.extentOffset,
		type: state.selection.type
	}
};

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		handleParagraphInsertion: () => {dispatch(actions.insertParagraph())},
// 		handleParagraphDeletion: () => {dispatch(actions.deleteParagraph())}
// 	}
// };

export default connect(
	mapStateToProps,
	null
)(Selection);