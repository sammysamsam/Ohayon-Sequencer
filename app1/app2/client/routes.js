import React from "react";
import { Route, IndexRoute, hashHistory } from "react-router";


import Layout from "./components/Layout/Layout";
import HomeLayout from "./components/Layout/HomeLayout";
import LoadProjectLayout from "./components/Layout/LoadProjectLayout";
import DevelopmentStageLayout from "./components/Layout/DevelopmentStageLayout";
import SequencingStageLayout from "./components/Layout/SequencingStageLayout";
import ResultStageLayout from "./components/Layout/ResultStageLayout";

export default (

		<Route path="/" component = {Layout} >
			<IndexRoute component = {HomeLayout}/>
			<Route path= "LoadProject" component = {LoadProjectLayout} />
			<Route path="DevelopmentStage" component = {DevelopmentStageLayout} /> 
			<Route path="SequencingStage" component = {SequencingStageLayout} /> 
			<Route path="ResultStage" component = {ResultStageLayout} /> 
		</Route>

	)

