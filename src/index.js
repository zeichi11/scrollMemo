import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { createStrore } from 'redux';
import reducers from './reducers';
//import reducers from './reducers/index'; 라는 의미

import * as actions from './actions';

const store = createStore(reducers);

console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(actions.increment());
store.dispatch(actions.increment());
store.dispatch(actions.decrement());
store.dispatch(actions.setColor([200, 200, 200]));

unsubscribe();// unsubscribe

store.dispatch(actions.setColor([210, 210, 210]));


const rootElement = document.getElementById('root');
ReactDOM.render(
    <App/>,
    rootElement
);