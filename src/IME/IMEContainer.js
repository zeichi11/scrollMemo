import IMEComponent from './IMEComponent';
import { connect, bindActionCreators } from 'react-redux';

export default connect(
    // dispatch => {
    // 	return {
    // 		updateSpan
    // 	}
    //
    // },
    (state, props) => {
        return {
            selection: state.selection,
            observer: props.observer
        }
    }
)(IMEComponent);