import React, { Component } from 'react';

function createWarning(functionName) {
    return () => console.warn(functionName + ' is not define.');
}

const defaultProps = {
    onPlus: createWarning('onPlus'),
    onSubtract: createWarning('onSubtract'),
    onRandomizeColor: createWarning('onRandomizeColor'),
};

class Control extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <button onClick={this.props.onPlus}>+</button>
                <button onClick={this.props.onSubtract}>-</button>
                <button onClick={this.props.onRandomizeColor}>Randomize Color</button>
            </div>
        );
    }
}

Control.defaultProps = defaultProps;

export default Control;