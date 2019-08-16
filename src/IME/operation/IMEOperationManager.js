/**
 * IME Operation Manager (singleton)
 */
import Constants from './IMEConstants';

let instance = null;

class IMEOperationManager {
    constructor() {
        this.getOperation = this.getOperation.bind(this);
    }

    createOperation(event, type, data) {
        return {
            type,
            event,
            data
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