import React, { Component } from 'react';
import { connect, bindActionCreators } from 'react-redux';
import CommonUtils from '../common/CommonUtils';

class Selection extends Component {
	constructor(props) {
		super(props);
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
	 * @param offset
	 * @returns {number|*}
	 */
	getOffsetX(targetParagraph, target, offset) {
		let BODY_MARGIN = 8,
			div = document.getElementById('dummy_wrap'),
			div2 = document.createElement('DIV'),
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

				span.appendChild(document.createTextNode(textNode.textContent.substring(0, offset)));
				div.appendChild(span);

				spanWidth = div.offsetWidth;

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
	 * 셀렉션의 깜빡이는 모션 설정
	 */
	setFlicker() {
		let selection = this.selection;
		selection.style.visibility = "visible";

		setInterval(function () {
			let visibility = selection.style.visibility;
			visibility = visibility === "visible" ? "hidden" : "visible";
			selection.style.visibility = visibility;
		}, 450);
	}

	/**
	 * componentDidMount
	 */
	componentDidMount() {
		this.setFlicker();
	}

	render() {
		let inlineStyle = {
				position: "absolute",
				width: "1px",
				height: 0 + 'px',
				top: 0 + 'px',
				left: 0 + 'px',
				background: "#000000"
			},
			getInlineStyle = () => {
				if (!this.props.anchorNode) {
					return inlineStyle;
				}

				let targetParagraph = CommonUtils.closestTag(this.props.anchorNode, 'P'),
					anchorNode = this.props.anchorNode,
					anchorOffset = this.props.anchorOffset,
					extentNode = this.props.extentNode,
					extentOffset = this.props.extentOffset;

				if (!targetParagraph) {
					return;
				}

				inlineStyle.top = this.getOffsetY(targetParagraph) + 'px';
				inlineStyle.left = this.getOffsetX(targetParagraph, anchorNode, anchorOffset) + 'px';
				inlineStyle.height = parseInt(targetParagraph.style['line-height']) + 'px';

				return inlineStyle;
			};

		return (
			<div
				style={getInlineStyle()}
				ref={ref => {this.selection = ref}}
			/>
		);
	}
}


export default Selection;