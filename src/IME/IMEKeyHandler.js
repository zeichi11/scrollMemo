import React, { Component } from 'react';
import Constants from './IMEConstants';
import IMEOperationManager from './operation/IMEOperationManager';

class IMEKeyHandler {
    /**
     * constructor
     * @param {object} observer
     */
    constructor(observer) {
        this.value = '';
        this.compositionStart = false;
        this.observer = null;

        this.startComposition = this.startComposition.bind(this);
        this.updateComposition = this.updateComposition.bind(this);
        this.endComposition = this.endComposition.bind(this);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        this.createOperation = this.createOperation.bind(this);
        this.addObserver = this.addObserver.bind(this);
        this.removeObserver = this.removeObserver.bind(this);

        this.addObserver(observer);
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
     * @param {object} observer
     */
    addObserver(observer) {
        this.observer = observer;
    }

    /**
     *
     */
    removeObserver() {
        this.observer = null;
    }

    /**
     * handle composition start
     * @param e
     */
    startComposition(e) {
        console.log('-- compositionstart --');
        console.log(e.data);
        console.log('----------------------');

        // let target = e.target;
        this.compositionStart = true;
        this.observer.startComposition(this.createOperation(e, Constants.opType.START_COMP, e.data));
    }

    /**
     * handle composition update
     * @param e
     */
    updateComposition(e) {
        console.log('-- compositionupdate --');
        console.log(e.data);
        console.log('----------------------');

        let target = e.target;
        this.value = target.value;
        this.observer.updateComposition(this.createOperation(e, Constants.opType.UPDATE_COMP, e.data));
    }

    /**
     * handle composition end
     * @param e
     */
    endComposition(e) {
        console.log('-- compositionend --');
        console.log(e.data);
        console.log('----------------------');

        let target = e.target;
        target.value = '';
        if (this.compositionStart) {
            this.observer.endComposition(this.createOperation(e, Constants.opType.END_COMP, e.data));
            this.compositionStart = false;
        }
    }

    /**
     * handle key down
     * @param e
     */
    handleKeyDown(e) {
        let target = e.target;
        this.value = target.value;

        console.log('-- KeyDown --');
        console.log(this.value);
        console.log('-------------');

        this.observer.handleKeyDown(this.createOperation(e, Constants.opType.KEY_DOWN, e.data));
    }

    /**
     * handle key up
     * @param e
     */
    handleKeyUp(e) {
        let target = e.target;
        this.value = target.value;

        console.log('-- KeyUp --');
        console.log(this.value);
        console.log('-------------');

        this.observer.handleKeyUp(this.createOperation(e, Constants.opType.KEY_UP, e.data));
    }

    /**
     * handle key press
     * @param e
     */
    handleKeyPress(e) {
        let target = e.target;
        this.value = target.value;

        console.log('-- KeyPress --');
        console.log(this.value);
        console.log('-------------');

        this.observer.handleKeyPress(this.createOperation(e, Constants.opType.KEY_PRESS, e.data));
    }
}

export default IMEKeyHandler;