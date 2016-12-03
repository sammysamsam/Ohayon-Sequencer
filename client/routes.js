import React from "react";
import { Route, IndexRoute, hashHistory } from "react-router";


import Layout from "./components/Layout/Layout";
import HomeLayout from "./components/Layout/HomeLayout";
import DevelopmentStageLayout from "./components/Layout/DevelopmentStageLayout";
import SequencingStageLayout from "./components/Layout/SequencingStageLayout";
import ResultStageLayout from "./components/Layout/ResultStageLayout";
import ToolsAnalysis from "./components/Layout/ToolsAnalysisLayout";


export default (

		<Route path="/" component = {Layout} >
			<IndexRoute component = {HomeLayout}/>
			<Route path="DevelopmentStage" component = {DevelopmentStageLayout} /> 
			<Route path="SequencingStage" component = {SequencingStageLayout} /> 
			<Route path="ResultStage" component = {ResultStageLayout} /> 
			<Route path="ToolsAnalysis" component = {ToolsAnalysis} /> 
		</Route>

	)

