import React from 'react';
import update from 'react-addons-update';
import Note from './Note';
import Section from './Section';
import Page from './Page';

class Navigator extends React.Component {
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
		const navInlineStyle = {
			'maxWidth': '300px',
			'minWidth': '200px',
			'width': '30%',
			'height': '100%',
			'borderRight': '1px solid #cccccc'
		};
		return (
			<div style={navInlineStyle}>
				<Note/>
				<Section/>
				<Page/>
			</div>
		)
	}
}

export default Navigator;