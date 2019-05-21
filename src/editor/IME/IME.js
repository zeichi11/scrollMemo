import IMEComponent from './IMEComponent';
import { connect, bindActionCreators } from 'react-redux';

export default connect(null,null
	// dispatch => {
		// return {
		// 	updateSpan
		// }

	// },
	// state => {
		// return {
		// 	onCompositionStart: handler.handleCompositionStart,
		// 	onCompositionUpdate: handler.handleCompositionUpdate,
		// 	onCompositionEnd: handler.handleCompositionEnd,
		// 	onKeyDown: handler.handleKeyDown,
		// 	onKeyUp: handler.handleKeyUp,
		// 	onKeyPress: handler.handleKeyPress
		// }
	// }
)(IMEComponent);