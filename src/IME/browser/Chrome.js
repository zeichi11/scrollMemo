class Chrome {
	/**
	 * constructor
	 * @param {object} keyHandler
	 * @param {object} imeView
	 */
	constructor() {
		this.value = '';
		this.compositionStart = false;

		this.startComposition = this.startComposition.bind(this);
		this.updateComposition = this.updateComposition.bind(this);
		this.endComposition = this.endComposition.bind(this);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	/**
	 * handle composition start
	 * @param e
	 */
	startComposition(e) {
		console.log('-- compositionstart --');
		console.log(e.data);
		console.log(e.type);
		console.log('----------------------');

		// let target = e.target;
		this.compositionStart = true;
		return e.data;
	}

	/**
	 * handle composition update
	 * @param e
	 */
	updateComposition(e) {
		console.log('-- compositionupdate --');
		console.log(e.data);
		console.log(e.type);
		console.log('----------------------');

		let target = e.target;
		this.value = target.value;
		return e.data;
	}

	/**
	 * handle composition end
	 * @param e
	 */
	endComposition(e) {
		console.log('-- compositionend --');
		console.log(e.data);
		console.log(e.type);
		console.log('----------------------');

		let target = e.target;
		target.value = '';
		if (this.compositionStart) {
			this.compositionStart = false;
			return e.data;
		}
	}

	/**
	 * handle key down
	 * @param e
	 */
	handleKeyDown(e) {
		let target = e.target;
		this.value = target.value;

		console.log('-- KeyDown --');
		console.log(this.value);
		console.log(e.type);
		console.log('-------------');

		return e.data;
	}

	/**
	 * handle key up
	 * @param e
	 */
	handleKeyUp(e) {
		let target = e.target;
		this.value = target.value;

		console.log('-- KeyUp --');
		console.log(this.value);
		console.log(e.type);
		console.log('-------------');

		if (this.compositionStart) {
			this.compositionStart = false;
		}

		// if (!compLang) {
		// 	this.keyHandler.handleKeyUp(this.createOperation(e, Constants.opType.KEY_UP, e.data));
		// }

		return e.data;
	}

	/**
	 * handle key press
	 * @param e
	 */
	handleKeyPress(e) {
		let target = e.target;
		this.value = target.value;

		console.log('-- KeyPress --');
		console.log(this.value);
		console.log(e.type);
		console.log('-------------');

		return e.data;
	}
}

export default Chrome;