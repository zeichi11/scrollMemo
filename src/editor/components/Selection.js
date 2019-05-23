import React, { Component } from 'react';
import { connect, bindActionCreators } from 'react-redux';
import CommonUtils from "../common/CommonUtils";

class Selection extends Component {
	constructor(props) {
		super(props);
	}








	/**
	 *
	 * @param {object} target
	 * @returns {null}
	 */
	getParentNode(target, nodeName) {
		return target ? CommonUtils.closestTag(target, nodeName) : null;
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
				span.innerHTML = '';
				div.innerHTML = '';

				span.appendChild(document.createTextNode(textNode.textContent.substring(0, focusOffset)));
				div.appendChild(span);
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
		console.log('-- mouse down --');
		console.log(e.target);

		let targetParagraph = this.getParentNode(e.target, 'P'),
			targetSpan = this.getParentNode(e.target, 'SPAN'),
			pageX = e.pageX,
			top,
			left,
			height;

		if (!targetParagraph || !targetSpan) {
			return;
		}

		top = this.getOffsetY(targetParagraph);
		left = this.getOffsetX(targetParagraph, e.target, pageX);
		height = parseInt(targetParagraph.style['line-height']);

		this.props.updateSelection(top, left, height);
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
		const selectionStyle = {
			position: "absolute",
			width: "1px",
			height: this.props.height + "px",
			top: this.props.top,
			left: this.props.left,
			background: "#000000"
		};

		const getStyle = function () {
			
		};



		return (
			<div
				style={selectionStyle}
				ref={ref => {this.selection = ref}}
			/>
		);
	}
}

export default Selection;