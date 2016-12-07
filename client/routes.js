import React from "react";
import { Route, IndexRoute, hashHistory } from "react-router";


import Layout from "./components/Layout/Layout";
import HomeLayout from "./components/Layout/HomeLayout";
import ProjectLayoutMain from "./components/Layout/ProjectLayoutMain";
import DevelopmentStageLayout from "./components/Layout/ProjectLayouts/DevelopmentStage";
import SequencingStageLayout from "./components/Layout/ProjectLayouts/SequencingStage";
import ResultStageLayout from "./components/Layout/ProjectLayouts/ResultStage";
import ToolsAnalysis from "./components/Layout/ToolsAnalysisLayout";


export default (

		<Route path="/" component = {Layout} >
			<IndexRoute component = {HomeLayout}/>
			
			<Route path="Project" component = {ProjectLayoutMain}>
				<Route path="Development" component = {DevelopmentStageLayout} /> 
				<Route path="Sequencing" component = {SequencingStageLayout} /> 
				<Route path="Result" component = {ResultStageLayout} /> 
			</Route>
			<Route path="ToolsAnalysis" component = {ToolsAnalysis} /> 
		
		</Route>

	)

