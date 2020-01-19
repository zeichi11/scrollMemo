let instance = null;

class OperationExecutor {

	/**
	 * constructor
	 * @param {object} callbacks
	 */
	constructor(callbacks) {
		this.value = '';
		this.compositionStart = false;
		this.callbackMap = null;

		this.setCallbackMap = this.setCallbackMap.bind(this);
		this.removeCallbackMap = this.removeCallbackMap.bind(this);

		this.setCallbackMap(callbacks);
	}

	/**
	 *
	 * @param {{handleInput, handleComposing, handleKeyDown, handleKeyUp, handleKeyPress}} callbacks
	 * @returns {{a: number, b: number, c: number}}
	 */
	setCallbackMap(callbacks) {
		this.callbackMap = callbacks;
	}

	/**
	 *
	 */
	removeCallbackMap() {
		this.callbackMap = null;
	}

	/**
	 *
	 * @param {object} op
	 */
	execute(op) {
		let eventType = op.type;

		if (!this.callbackMap.hasOwnProperty(eventType)) {
			console.error("[" + eventType + "] is not exist in callback Object.");
			return;
		}

		this.callbackMap[eventType](op);
	}
}

export default {
	getInstance: function (callbacks) {
		if (instance === null) {
			instance = new OperationExecutor(callbacks);
		}
		return instance;
	}
};


