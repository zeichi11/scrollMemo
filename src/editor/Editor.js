import React, { Component } from 'react';
import Paragraph from './components/Paragraph';
import SelectionContainer from './SelectionContainer';
import CommonUtils from './common/CommonUtils';

import KeyHandler from './handler/KeyHandler';

import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../actions';

class Editor extends Component {
	constructor(props) {
		super(props);

		this.isDragStart = false;

		this.keyHandler = new KeyHandler(document.getElementById('editor'));

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);

		this.getFocusOffset = this.getFocusOffset.bind(this);

	}

	/**
	 *
	 * @param {object} target
	 * @returns {null}
	 */
	getParagraph(target) {
		return target ? CommonUtils.closestTag(target, 'P') : null;
	}

	/**
	 *
	 * @param paragraph
	 * @param target
	 * @param pageX
	 * @returns {number|*}
	 */
	getFocusOffset(paragraph, target, pageX) {
		let BODY_MARGIN = 8,
			div = document.getElementById('dummy_wrap'),
			focusOffset = 0,
			spanList = paragraph.childNodes,
			targetTextNode,
			textNode,
			span,
			spanWidth = 0,
			i;

		if (target.nodeName === 'SPAN') {
			targetTextNode = target.firstChild;
		}

		for (i = 0; i < spanList.length; i++) {
			textNode = spanList[i].childNodes[0];
			if (textNode === targetTextNode) {
				span = document.createElement('SPAN');
				span.style.whiteSpace = 'pre';

				while (true) {
					span.innerHTML = '';
					div.innerHTML = '';

					span.appendChild(document.createTextNode(textNode.textContent.substring(0, focusOffset)));
					div.appendChild(span);

					spanWidth = div.offsetWidth;
					if (spanWidth + BODY_MARGIN >= pageX) {
						break;
					}

					focusOffset++;

					if (focusOffset > textNode.textContent.length) {
						break;
					}
				}
				break;

			}
		}

		return focusOffset;
	}

	/**
	 *
	 * @param target
	 * @param pageX
	 * @returns {{node: *, offset: number}}
	 */
	getFocusInfo(target, pageX) {
		let focusNode = target,
			focusParagraph = CommonUtils.closestTag(focusNode, 'P'),
			focusOffset = 0;

		if (target.nodeName !== 'P') {
			focusNode = CommonUtils.closestTag(target, 'SPAN');
			focusOffset = this.getFocusOffset(focusParagraph, focusNode, pageX);
		}

		return {
			node: focusNode,
			offset: focusOffset
		}
	}

	/**
	 *
	 * @param {object} e
	 */
	handleMouseDown(e) {
		console.log('-- mouse dpwn --');
		console.log(e.target);

		let focusInfo = this.getFocusInfo(e.target, e.pageX);
		console.log(focusInfo.node, focusInfo.offset);
		this.props.updateAnchor(focusInfo.node, focusInfo.offset);
		this.isDragStart = true;
	}

	/**
	 *
	 * @param {object} e
	 */
	handleMouseMove(e) {
		let focusInfo;

		if (this.isDragStart){
			console.log('-- mouse move --');
			console.log(e.target);

			focusInfo = this.getFocusInfo(e.target, e.pageX);
			console.log(focusInfo.node, focusInfo.offset);
			this.props.updateExtent(focusInfo.node, focusInfo.offset);
		}
	}

	/**
	 * mouse up event handler
	 * @param {object} e
	 */
	handleMouseUp(e) {
		console.log('-- mouse up --');
		console.log(e.target);

		if (this.isDragStart) {
			this.isDragStart = false;
		}
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
				<SelectionContainer onMouseUp={this.handleMouseUp}/>
			</div>
		)
	}
}

export default Editor;