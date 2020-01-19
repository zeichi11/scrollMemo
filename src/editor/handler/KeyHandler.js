class KeyHandler {
	constructor() {
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.editor = document.getElementById("noteWrapper");
		this.keyHandler = document.createElement("DIV");
		this.keyHandler.setAttribute("id", "keyHandler");
		this.keyHandler.style.width = "500px";
		this.keyHandler.style.height = "500px";
		this.keyHandler.style.backgroundColor = "#dff5e5";


		this.editor.appendChild(this.keyHandler);
	}

	handleInput(imeOp) {
		console.log("---------------------");
		console.log(imeOp);
	}

	handleComposing(imeOp) {
		console.log("---------------------");
		console.log(imeOp);
	}

	handleKeyDown(e) {
		// console.log('-- mousedown --');
		// console.log(e.target);
	}

	handleKeyUp(e) {
		// console.log('-- mouseup --');
		// console.log(e.target);
	}

	handleKeyPress(e) {
		// console.log('-- mouseup --');
		// console.log(e.target);
	}
}

export default KeyHandler;