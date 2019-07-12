import React from 'react';
import update from 'react-addons-update';

class Note extends React.Component {
	constructor (props) {
		super(props);
	}

	/**
	 * component 마운트 전 처리
	 */
	componentWillMount() {

	}

	/**
	 * component 업데이트 후 처리
	 * @param prevProps
	 * @param prevState
	 */
	componentDidUpdate(prevProps, prevState) {

	}

	render() {
		const docInlineStyle = {
			'width': '70%',
			'height': '100%'
		};
		return (
			<div style={docInlineStyle}>
			</div>
		)
	}
}

export default Note;