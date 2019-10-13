// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App';
//
// const rootElement = document.getElementById('root');
// ReactDOM.render(
//     <App/>,
//     rootElement
// );


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App';
//
// import { createStore } from 'redux';
// import reducers from './reducers';
// //import reducers from './reducers/index'; 라는 의미
//
// import * as actions from './actions';
//
//
// const store = createStore(reducers);
//
// // console.log(store.getState());
// // const unsubscribe = store.subscribe(() => console.log(store.getState()));
// // store.dispatch(actions.increment());
// // store.dispatch(actions.increment());
// // store.dispatch(actions.decrement());
// // store.dispatch(actions.setColor([200, 200, 200]));
// //
// // unsubscribe();// unsubscribe
// //
// // store.dispatch(actions.setColor([210, 210, 210]));
//
//
//
// import { Provider } from 'react-redux';
//
// const rootElement = document.getElementById('root');
// ReactDOM.render(
//     <Provider store={store}>
//         <App/>
//     </Provider>,
//     rootElement
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './editor/reducers';
import EditorContainer from './editor/EditorContainer';
import IMEContainer from './IME/IMEContainer';
import KeyHandler from './editor/handler/KeyHandler';

import ScrollMemo from './components/ScrollMemo';

const rootElement = document.getElementById('editor');
const store = createStore(reducers);
const KeyHandler = new KeyHandler();
const keyHandlers = {
	'handleInfput': KeyHandler.handleInput,
	'handleKeyDown': KeyHandler.handleKeyDown,
	'handleKeyUp': KeyHandler.handleKeyUp,
	'handleKeyPress': KeyHandler.handleKeyPress
};

ReactDOM.render(
	<Provider store={store}>
		<EditorContainer/>
		<IMEContainer keyHandlers={keyHandlers}/>
	</Provider>,
	rootElement
);

// const rootEl = document.getElementById('root');
// const store = createStore(reducers);
//
// ReactDOM.render(
// 	<Provider store={store}>
// 		<ScrollMemo/>
// 	</Provider>,
// 	rootEl
// );






