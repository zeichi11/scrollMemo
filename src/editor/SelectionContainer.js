import React from 'react';
import { connect, bindActionCreators } from 'react-redux';
import Selection from './components/Selection';
// import * as actions from './actions';

const mapStateToProps = (state) => {
	return {
		height: state.selection.height,
		top: state.selection.top,
		left: state.selection.left
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