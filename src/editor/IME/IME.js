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

		this.executeOperation = this.executeOperation.bind(this);
		this.createOperation = this.createOperation.bind(this);
		this.setBrowser();
		this.imeView = imeView;
	}

	/**
	 * set current browser.
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
	 * @param {object} op
	 */
	executeOperation(op) {
		this.opExecutor.execute(op);
	}

	/**
	 * handle composition start
	 * @param {object} e
	 */
	startComposition(e) {
		let data = this.browser.startComposition(e),
			op = this.createOperation(e, Constants.opType.START_COMP, data);
		this.executeOperation(op);
	}

	/**
	 * handle composition update
	 * @param {object} e
	 */
	updateComposition(e) {
		let data = this.browser.updateComposition(e),
			op = this.createOperation(e, Constants.opType.INPUT, data);
		this.executeOperation(op);
	}

	/**
	 * handle composition end
	 * @param {object} e
	 */
	endComposition(e) {
		let data = this.browser.endComposition(e),
			op = this.createOperation(e, Constants.opType.END_COMP, data);
		if (data) {
			this.executeOperation(op);
		}
	}

	/**
	 * handle key down
	 * @param {object} e
	 */
	handleKeyDown(e) {
		let data = this.browser.handleKeyDown(e),
			op = this.createOperation(e, Constants.opType.KEY_DOWN, data);
		this.executeOperation(op);
	}

	/**
	 * handle key up
	 * @param {object} e
	 */
	handleKeyUp(e) {
		let data = this.browser.handleKeyUp(e),
			op = this.createOperation(e, Constants.opType.KEY_UP, data);
		this.executeOperation(op);
	}

	/**
	 * handle key press
	 * @param {object} e
	 */
	handleKeyPress(e) {
		let data = this.browser.handleKeyPress(e),
			op = this.createOperation(e, Constants.opType.KEY_PRESS, data);
		if (data) {
			this.executeOperation(op);
		}
	}
}

export default IME;



