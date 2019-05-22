import React from 'react';
import { connect, bindActionCreators } from 'react-redux';
import Selection from './components/Selection';
import * as actions from "./actions";

const mapStateToProps = (state) => {
	return {
		anchor: state.selection.anchorNode,
		anchorOffset: state.selection.anchorOffset,
		extent: state.selection.extentNode,
		extentOffset: state.selection.extentOffset
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSelection: (top, left, height) => {dispatch(actions.updateSelection(top, left, height))},
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Selection);