import React, { Component } from 'react';
import Paragraph from './components/Paragraph';
import CommonUtils from './common/CommonUtils';
import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../actions';

class Editor extends Component {
	constructor(props) {
		super(props);

		this.selection = {
			'anchorNode': null,
			'anchorOffset': 0,
			'extentNode': null,
			'extentOffset': 0
		};

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
	}

	/**
	 *
	 * @param {object} e
	 */
	handleMouseDown(e) {

	}

	/**
	 *
	 * @param {object} e
	 */
	handleMouseMove(e) {

	}

	/**
	 * mouse up event handler
	 * @param {object} e
	 */
	handleMouseUp(e) {

	}

	/**
	 * render Component
	 * @returns {XML}
	 */
	render() {
		const renderParagraphs = (paragraphs, styles) => {
			// let paragraphs = data;
			// style = data.style;
			// hyperlink = data.hyperlink,
			// object = data.object;

			// data 정보를 map 함수로 처리한 결과를 반환한다.
			return paragraphs.map((paragraph, i) => {
				let pid = paragraph.id,
					content = paragraph.content,
					style = styles[pid];
				// object = object[pid],
				// hyperlink = hyperlink[pid];

				// map의 callback 함수의 parameter는
				// currentValue : 현재 처리되고 있는 요소 (contact)
				// Index : 현재 처리되고 있는 요소의 index 값 (i)
				// Array : 메소드가 불려진 배열
				// ContactInfo 컴포넌트의 props에 contact와 key를 설정함
				return (
					<Paragraph
						class={"editor_paragraph"}
						key={i}
						index={i}
						id={pid}
						content={content}
						style={style}
						updateLineHeight={this.props.updateLineHeight}
						// object={object}
						// hyperlink={hyperlink}
					/>
				);
			})
		};

		return (
			<div>
				<div
					id={"wrapper"}
					onMouseDown={this.handleMouseDown}
					onMouseMove={this.handleMouseMove}
					onMouseUp={this.handleMouseUp}
					ref = {ref => {this.wrapper = ref}}
				>
					{renderParagraphs(this.props.paragraphs, this.props.styles)}
				</div>
			</div>
		)
	}
}

export default Editor;