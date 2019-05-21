import React, { Component } from 'react';
import SpanList from './SpanList';

class Paragraph extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let MARGIN_TOP = 16,
			height = this.paragraph.offsetHeight;
		this.props.updateLineHeight(this.props.id, MARGIN_TOP + height);
	}

	render() {
		const paragraphStyle = {
			lineHeight: this.props.style.lineHeight + "px"
		};

		return (
			<p id={this.props.id}
			   className={this.props.class}
			   style={paragraphStyle}
			   ref={ref => {this.paragraph = ref}}>

				<SpanList
					style={this.props.style}
					content={this.props.content}
				/>
			</p>

		)
	}
}

export default Paragraph;