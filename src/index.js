import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import Router_dev from "./Router_dev";

const Root = () => (
	<Router_dev />
);

ReactDOM.render(<Root />, document.getElementById('noteWrapper'));