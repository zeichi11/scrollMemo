/**
 * IME Operation Manager (singleton)
 */
import Constants from '../common/Constants';

let instance = null;

class IMEOperationManager {
    constructor() {
        this.getOperation = this.getOperation.bind(this);
        this.createOperation = this.createOperation.bind(this);
    }

    createOperation(event, type, char, keyCode) {
        return {
            type,
            event,
			char,
			keyCode
        }
    }

    getOperation(event, type, char, keyCode) {
    	return {
    		type,
			event,
			char,
			keyCode
		}
	}
}

export default {
    getInstance: function () {
        if (instance === null) {
            instance = new IMEOperationManager();
        }
        return instance;
    }
};