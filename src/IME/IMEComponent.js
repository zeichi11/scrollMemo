import React, { Component } from 'react';
import IMEKeyHandler from './IMEKeyHandler';

class IMEComponent extends Component {
	/**
	 * constructor
	 * @param object props
	 */
	constructor(props) {
		super(props);

		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.handleCompositionStart = this.handleCompositionStart.bind(this);
		this.handleCompositionUpdate = this.handleCompositionUpdate.bind(this);
		this.handleCompositionEnd = this.handleCompositionEnd.bind(this);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.IMEKeyHandler = new IMEKeyHandler(props.keyHandler);
	}

	/**
	 * handle Blur
	 */
	handleOnBlur() {
		this.imeTextArea.focus();
	}

	/**
	 *
	 */
	componentDidMount() {
		this.imeTextArea.focus();
	}

	/**
	 * handle composition start
	 * @param e
	 */
	handleCompositionStart(e) {
		this.IMEKeyHandler.startComposition(e);
	}

	/**
	 * handle composition update
	 * @param e
	 */
	handleCompositionUpdate(e) {
		this.IMEKeyHandler.updateComposition(e);
	}

	/**
	 * handle composition end
	 * @param e
	 */
	handleCompositionEnd(e) {
		this.IMEKeyHandler.endComposition(e);
	}

	/**
	 * handle keydown event
	 * @param e
	 */
	handleKeyDown(e) {
		this.IMEKeyHandler.handleKeyDown(e);
	}

	/**
	 * handle keyup event
	 * @param e
	 */
	handleKeyUp(e) {
		this.IMEKeyHandler.handleKeyUp(e);
	}

	/**
	 * handle keypress event
	 * @param e
	 */
	handleKeyPress(e) {
		this.IMEKeyHandler.handleKeyPress(e);
	}

	render() {
		const imeInputStyle = {
			'width': '100px',
			'height': '100px'
		};

		return (
			<div>
				<div style={{"width":"0px", "height":"3px", "overflow": "hidden"}}>
					<textarea
						 ref={(ref)=>(this.imeTextArea = ref)}
						 // style={imeInputStyle}
						 onBlur={this.handleOnBlur}
						 onCompositionStart={this.handleCompositionStart}
						 onCompositionUpdate={this.handleCompositionUpdate}
						 onCompositionEnd={this.handleCompositionEnd}
						 onKeyDown={this.handleKeyDown}
						 onKeyPress={this.handleKeyPress}
						 onKeyUp={this.handleKeyUp}
					>
					</textarea>
				</div>

			</div>
		);
	}
}

export default IMEComponent;