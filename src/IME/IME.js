import Constants from './common/Constants';
import CommonUtils from './common/CommonUtils';
import Chrome from './browser/Chrome'
import Firefox from './browser/Firefox'
import IE from './browser/MSIE'
import IMEOperationManager from './operation/IMEOperationManager';

class IME {
	/**
	 * constructor
	 * @param {object} keyHandler
	 * @param {object} imeView
	 */
	constructor(keyHandler, imeView) {
		this.value = '';
		this.compositionStart = false;
		this.keyHandler = null;
		this.browser = null;

		this.startComposition = this.startComposition.bind(this);
		this.updateComposition = this.updateComposition.bind(this);
		this.endComposition = this.endComposition.bind(this);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.createOperation = this.createOperation.bind(this);
		this.addKeyHandler = this.addKeyHandler.bind(this);
		this.removeKeyHandler = this.removeKeyHandler.bind(this);

		this.addKeyHandler(keyHandler);
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
	 * @param {object} keyHandler
	 */
	addKeyHandler(keyHandler) {
		this.keyHandler = keyHandler;
	}

	/**
	 *
	 */
	removeKeyHandler() {
		this.keyHandler = null;
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
		let eventType = e.type,
			executeFunc,
			op = this.createOperation(e, opType, value);

		switch (eventType) {
			case Constants.eventType.COMP_START:
				executeFunc = this.keyHandler.startComposition;
				break;
			case Constants.eventType.COMP_UPDATE:
				executeFunc = this.keyHandler.updateComposition;
				break;
			case Constants.eventType.COMP_END:
				executeFunc = this.keyHandler.endComposition;
				break;
			case Constants.eventType.KEYDOWN:
				executeFunc = this.keyHandler.handleKeyDown;
				break;
			case Constants.eventType.KEYUP:
				executeFunc = this.keyHandler.handleKeyUp;
				break;
			case Constants.eventType.KEYPRESS:
				executeFunc = this.keyHandler.handleKeyPress;
				break;
		}

		executeFunc(op);
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
		let date = this.browser.endComposition(e);
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



