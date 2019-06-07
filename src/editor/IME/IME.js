import IMEComponent from './IMEComponent';
import { connect, bindActionCreators } from 'react-redux';

export default connect(
	// dispatch => {
	// 	return {
	// 		updateSpan
	// 	}
    //
	// },
	state => {
		return {
			selection: state.selection
		}
	}
)(IMEComponent);