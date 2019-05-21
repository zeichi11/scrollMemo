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
		console.log(e);
		console.log('----------------------');
	}

	handleCompositionUpdate(e) {
		console.log('-- compositionupdate --');
		// console.log(this.imeInput.textContent);
		console.log(e.data);
		console.log('----------------------');
	}

	handleCompositionEnd(e) {
		console.log('-- compositionend --');
		// console.log(this.imeInput.value);
		console.log(e.data);
		console.log('----------------------');
		//appen and clear
		this.imeInput.value = '';
	}

	handleKeyDown(e) {
		console.log('-- KeyDown --');
		// console.log(this.imeInput.value);
		console.log(e.data);
		console.log('-------------');
	}

	handleKeyPress(e) {
		console.log('-- KeyPress --');
		// console.log(this.imeInput.value);
		console.log(e.data);
		console.log('--------------');
	}

	handleKeyUp(e) {
		console.log('-- KeyUp --');
		// console.log(this.imeInput.value);
		console.log(e.data);
		console.log('-----------');
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
