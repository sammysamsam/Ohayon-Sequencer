import React from "react";
import ReactDOM from "react-dom";

import routes from './routes';

import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore} from 'react-redux';

//js
import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/materialize-css/bin/materialize.js';

//css

import './StyleSheet/hover-min.css';
import './StyleSheet/react-bootstrap-table.css';

import '../node_modules/elemental/less/elemental.less';
import '../node_modules/materialize-css/bin/materialize.css';
import 'react-select/dist/react-select.css';

const app = document.getElementById('app');

ReactDOM.render(

	<Router history = {hashHistory} routes = {routes}>
	</Router> , app);
