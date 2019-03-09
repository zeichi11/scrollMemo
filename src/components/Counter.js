import React, { Component } from 'react';

import Value from './Value';
import Control from './Control';

const defaultProps = {
};

class Counter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Value/>
                <Control/>
            </div>
        );
    }
}

Control.defaultProps = defaultProps;

export default Counter;