import React, { Component } from 'react';
import { connect, bindActionCreators } from 'react-redux';

class Selection extends Component {
	constructor(props) {
		super(props);
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

		return (
			<div
				style={selectionStyle}
				ref={ref => {this.selection = ref}}
			/>
		);
	}
}

export default Selection;