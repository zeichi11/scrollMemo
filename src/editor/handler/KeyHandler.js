class KeyHandler {
	constructor() {
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	processInput() {

	}

	handleKeyDown(e) {
		// console.log('-- mousedown --');
		// console.log(e.target);
	}

	handleKeyUp(e) {
		// console.log('-- mouseup --');
		// console.log(e.target);
	}
}

export default KeyHandler;