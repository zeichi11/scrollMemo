import Constants from './common/Constants';
import CommonUtils from './common/CommonUtils';
import Chrome from './browser/Chrome'
import Firefox from './browser/Firefox'
import IE from './browser/MSIE'
import IMEOperationManager from './operation/IMEOperationManager';

/**
 * TODO Singleton 으로 변경
 */

let instance = null;

class OperationExecutor {

	/**
	 * constructor
	 * @param {object} keyHandlers
	 */
	constructor(keyHandlers) {
		this.value = '';
		this.compositionStart = false;
		this.keyHandlers = null;
		this.handleInput = null;
		this.handleKeyDown = null;
		this.handleKeyUp = null;
		this.handleKeyPress = null;

		this.attachKeyHandlers = this.attachKeyHandlers.bind(this);
		this.removeKeyHandler = this.removeKeyHandler.bind(this);

		this.attachKeyHandlers(keyHandlers);
	}

	/**
	 *
	 * @param {object} keyHandlers
	 */
	attachKeyHandlers(keyHandlers) {
		this.keyHandlers = keyHandlers;
		this.handleInput = keyHandlers.handleInput;
		this.handleKeyDown = keyHandlers.handleKeyDown;
		this.handleKeyUp = keyHandlers.handleKeyUp;
		this.handleKeyPress = keyHandlers.handleKeyPress;
		// this.handlePress = keyHandlers.handlePress;
	}

	/**
	 *
	 */
	removeKeyHandler() {
		this.keyHandlers = null;
	}

	/**
	 *
	 * @param {object} op
	 */
	execute(op) {
		let eventType = op.type;

		switch (eventType) {
			case Constants.eventType.INPUT:
				this.handleInput();
				break;
			case Constants.eventType.KEYDOWN:
				this.handleKeyDown();
				break;
			case Constants.eventType.KEYUP:
				this.handleKeyUp();
				break;
			case Constants.eventType.KEYPRESS:
				this.handleKeyPress();
				break;
		}
	}
}

export default {
	getInstance: function (keyHandlers) {
		if (instance === null) {
			instance = new OperationExecutor(keyHandlers);
		}
		return instance;
	}
};


