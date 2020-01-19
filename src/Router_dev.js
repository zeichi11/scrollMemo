import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Editor from "./editor/EditorApp";

const routerDev = () => {
	return (
		<Router>
			<Route exact path='/' component={App}/>
			<Route exact path='/editor' component={Editor}/>
			{/*<Route path="/ime" component={ime}/>*/}
			{/*<Route path="/test/:option" component={test}/>*/}
		</Router>
	);
};

export default routerDev;