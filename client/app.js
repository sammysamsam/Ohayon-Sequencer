import React from "react";
import ReactDOM from "react-dom";

import routes from './routes';

import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore} from 'react-redux';

const app = document.getElementById('app');

ReactDOM.render(

	<Router history = {hashHistory} routes = {routes}>
	</Router> , app);
