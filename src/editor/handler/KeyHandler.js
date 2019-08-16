class KeyHandler {

	constructor(bindTarget) {
		this.bindTarget = bindTarget;
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.bindKeyDownEvent();
		this.bindKeyUpEvent();


	}

	processInput() {

	}

	bindKeyDownEvent() {
		this.bindTarget.onkeydown = this.handleKeyDown;
	}

	bindKeyUpEvent() {
		this.bindTarget.onkeyup = this.handleKeyUp;
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