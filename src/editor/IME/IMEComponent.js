import React, { Component } from 'react';

class IMEComponent extends Component {
	constructor(props) {
		super(props);

		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.handleCompositionStart = this.handleCompositionStart.bind(this);
		this.handleCompositionUpdate = this.handleCompositionUpdate.bind(this);
		this.handleCompositionEnd = this.handleCompositionEnd.bind(this);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
		this.updateSelection = this.updateSelection.bind(this);

		this.value = '';
		this.compositionStart = false;
	}

	update(value) {
		let selection = this.props.selection,
			anchorNode = selection.anchorNode,
			anchorOffset = selection.anchorOffset,
			extentNode = selection.extentNode,
			extentOffset = selection.extentOffset,
			textNode,
			textContent,
			newTextContent = '';

		// if (anchorNode === extentNode) {
		// 	if (anchorOffset === extentOffset) {
		// 		console.log(anchorNode);
		// 	}
		// }

		if (anchorNode) {
			textNode = anchorNode.firstChild;
			if (textNode.nodeName === '#text') {
				textContent = textNode.textContent;
				newTextContent = textContent.slice(0, anchorOffset) + value + textContent.slice(anchorOffset);
				console.log('update');
				console.log(newTextContent);
			}

		}
	}

	delete() {

	}

	updateSelection() {

	}

	handleOnBlur() {
		this.imeInput.focus();
	}

	componentDidMount() {
		this.imeInput.focus();

		// this.imeInput.addEventListener('compositionstart', function (e) {
		// 	console.log('-- compositionstart --');
		// 	console.log(e)
		// });
		//
		// this.imeInput.addEventListener('compositionupdate', function (e) {
		// 	console.log('-- compositionupdate --');
		// 	console.log(e)
		// });
		//
		// this.imeInput.addEventListener('compositionend', function (e) {
		// 	console.log('-- compositionend --');
		// 	console.log(e)
		// });
	}

	handleCompositionStart(e) {
		console.log('-- compositionstart --');
		console.log('----------------------');
		this.compositionStart = true;
	}

	handleCompositionUpdate(e) {
		console.log('-- compositionupdate --');
		// console.log(this.imeInput.textContent);
		console.log(e.data);
		console.log('----------------------');
		this.value = this.imeInput.value;
	}

	handleCompositionEnd(e) {
		console.log('-- compositionend --');
		// console.log(this.imeInput.value);
		console.log(e.data);
		console.log('----------------------');
		//appen and clear
		this.imeInput.value = '';
		if (this.compositionStart) {
			this.compositionStart = false;
			// update cursor
		}
	}

	handleKeyDown(e) {
		console.log('-- KeyDown --');
		// console.log(this.imeInput.value);
		this.value = this.imeInput.value;
		console.log('-------------');
	}

	handleKeyPress(e) {
		console.log('-- KeyPress --');
		// console.log(this.imeInput.value);
		// this.value = this.imeInput.value;
		// console.log(this.value);
		console.log('--------------');
	}

	handleKeyUp(e) {
		console.log('-- KeyUp --');
		// console.log(this.imeInput.value);
		console.log('-----------');
		if (!this.compositionStart) {
			this.value = this.imeInput.value;
			console.log(this.value);
			this.imeInput.value = '';

			this.update(this.value);
			// update cursor
		}
	}

	render() {
		const imeInputStyle = {
			'width': '400px',
			'height': '300px'
		};

		return (
			<div>
				<input
					ref={(ref)=>(this.imeInput = ref)}
					onBlur={this.handleOnBlur}
					onCompositionStart={this.handleCompositionStart}
					onCompositionUpdate={this.handleCompositionUpdate}
					onCompositionEnd={this.handleCompositionEnd}
					onKeyDown={this.handleKeyDown}
					onKeyPress={this.handleKeyPress}
					onKeyUp={this.handleKeyUp}
					style={imeInputStyle}
				/>
			</div>
		);
	}
}

export default IMEComponent;
