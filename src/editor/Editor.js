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

		this.selection = {
			'anchorNode': null,
			'anchorOffset': 0,
			'extentNode': null,
			'extentOffset': 0
		};

		this.keyHandler = new KeyHandler(document.getElementById('editor'));

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);

		this.getOffsetY = this.getOffsetY.bind(this);
		this.getOffsetX = this.getOffsetX.bind(this);
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
	 * @param {element} targetParagraph
	 * @returns {number}
	 */
	getOffsetY(targetParagraph) {
		let PARAGRAPH_PADDING_BOTTOM = 15,
			paragraphList = this.props.paragraphs,
			styles = this.props.styles,
			targetParagraphId,
			paragraphId,
			style,
			top = 0,
			lineHeight = 0,
			i;

		if (!targetParagraph) {
			return top;
		}

		targetParagraphId = targetParagraph.getAttribute('id');
		for (i = 0; i < paragraphList.length; i++) {
			paragraphId = paragraphList[i].id;
			style = styles[paragraphId];

			if (style) {
				if (paragraphId === targetParagraphId) {
					break;
				}

				lineHeight = style.lineHeight;
				top = top + lineHeight + PARAGRAPH_PADDING_BOTTOM;
			}
		}

		return top;
	}

	/**
	 *
	 * @param targetParagraph
	 * @param target
	 * @param pageX
	 * @returns {number|*}
	 */
	getOffsetX(targetParagraph, target, pageX) {
		let BODY_MARGIN = 8,
			div = document.getElementById('dummy_wrap'),
			div2 = document.createElement('DIV'),
			focusOffset = 0,
			spanList = targetParagraph.childNodes,
			targetTextNode,
			textNode,
			span,
			spanWidth = 0,
			left,
			i;

		if (target.nodeName === 'SPAN') {
			targetTextNode = target.firstChild;
		}

		for (i = 0; i < spanList.length; i++) {
			textNode = spanList[i].childNodes[0];
			if (textNode === targetTextNode) {
				span = document.createElement('SPAN');
				span.style.whiteSpace = 'pre';

				while (spanWidth + BODY_MARGIN < pageX) {
					span.innerHTML = '';
					div.innerHTML = '';

					span.appendChild(document.createTextNode(textNode.textContent.substring(0, focusOffset)));
					div.appendChild(span);

					spanWidth = div.offsetWidth;
					focusOffset++;

					if (focusOffset > textNode.textContent.length) {
						break;
					}
				}
				break;

			} else {
				div2.appendChild(spanList[i].cloneNode(true));
			}
		}

		if (div.firstChild) {
			div2.appendChild(div.firstChild);
		}

		div.innerHTML = div2.innerHTML;
		left = div.offsetWidth + BODY_MARGIN;
		div.innerHTML = '';

		return left;
	}

	/**
	 *
	 * @param {object} e
	 */
	handleMouseDown(e) {
		console.log('-- mouse dpwn --');
		console.log(e.target);

		this.selection.anchorNode = e.target;
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
		console.log('-- mouse up --');
		console.log(e.target);

		let targetParagraph = this.getParagraph(e.target),
			pageX = e.pageX,
			top,
			left,
			height;

		if (!targetParagraph) {
			return;
		}

		top = this.getOffsetY(targetParagraph);
		left = this.getOffsetX(targetParagraph, e.target, pageX);
		height = parseInt(targetParagraph.style['line-height']);

		this.props.updateSelection(top, left, height);
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