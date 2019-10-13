import Constants from './common/Constants';
import CommonUtils from './common/CommonUtils';
import Chrome from './browser/Chrome'
import Firefox from './browser/Firefox'
import IE from './browser/MSIE'
import IMEOperationManager from './operation/IMEOperationManager';
import OperationExecutor from './operation/OperationExecutor';

class IME {
	/**
	 * constructor
	 * @param {object} keyHandlers
	 * @param {object} imeView
	 */
	constructor(keyHandlers, imeView) {
		this.value = '';
		this.compositionStart = false;
		this.keyHandlers = null;
		this.handleInput = null;
		this.handlePress = null;
		this.browser = null;
		this.opExecutor = OperationExecutor.getInstance(keyHandlers);

		this.startComposition = this.startComposition.bind(this);
		this.updateComposition = this.updateComposition.bind(this);
		this.endComposition = this.endComposition.bind(this);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.createOperation = this.createOperation.bind(this);
		this.attachKeyHandlers = this.attachKeyHandlers.bind(this);
		this.removeKeyHandler = this.removeKeyHandler.bind(this);

		this.attachKeyHandlers(keyHandlers);
		this.setBrowser();
		this.imeView = imeView;
	}

	/**
	 * create IME operation
	 * @param {object} e
	 * @param {string} type
	 * @param {string} data
	 * @returns {{data, type, event}}
	 */
	createOperation(e, type, data) {
		const opManager = IMEOperationManager.getInstance();
		return opManager.createOperation(e, type, data);
	}

	/**
	 *
	 */
	setBrowser() {
		switch (CommonUtils.getBrowser()) {
			case Constants.browserType.CHROME:
				this.browser = new Chrome();
				break;
			case Constants.browserType.FIREFOX:
				this.browser = new Firefox();
				break;
			case Constants.browserType.EDGE:
				this.browser = new Edge();
				break;
			case Constants.browserType.MSIE:
				this.browser = new Msie();
				break;
		}
	}

	/**
	 *
	 * @param {object} e
	 * @param {string} opType
	 * @param {string} value
	 */
	executeHandler(e, opType, value) {
		let op = this.createOperation(e, opType, value);
		this.opExecutor.execute(op);
	}

	/**
	 * handle composition start
	 * @param {object} e
	 */
	startComposition(e) {
		let data = this.browser.startComposition(e);
		this.executeHandler(e, Constants.opType.START_COMP, data);
	}

	/**
	 * handle composition update
	 * @param {object} e
	 */
	updateComposition(e) {
		let data = this.browser.updateComposition(e);
		this.executeHandler(e, Constants.opType.UPDATE_COMP, data);
	}

	/**
	 * handle composition end
	 * @param {object} e
	 */
	endComposition(e) {
		let data = this.browser.endComposition(e);
		if (data) {
			this.executeHandler(e, Constants.opType.END_COMP, data);
		}
	}

	/**
	 * handle key down
	 * @param {object} e
	 */
	handleKeyDown(e) {
		let data = this.browser.handleKeyDown(e);
		this.executeHandler(e, Constants.opType.KEY_DOWN, data);
	}

	/**
	 * handle key up
	 * @param {object} e
	 */
	handleKeyUp(e) {
		let data = this.browser.handleKeyUp(e);
		this.executeHandler(e, Constants.opType.KEY_UP, data);
	}

	/**
	 * handle key press
	 * @param {object} e
	 */
	handleKeyPress(e) {
		let data = this.browser.handleKeyPress(e);
		if (data) {
			this.executeHandler(e, Constants.opType.KEY_PRESS, data);
		}
	}
}

export default IME;



