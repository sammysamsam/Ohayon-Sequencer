import React from "react";

import Strandinput from "../Pages/DevelopmentStage/strandinput";
import Overview from "../Pages/DevelopmentStage/overview";
import Sidebar from "../Pages/DevelopmentStage/sidebar";
import ProjectNavigationBar from "../Pages/projectnavigationbar";
import Stranddisplay from "../Pages/DevelopmentStage/stranddisplay";
import Conditions from "../Pages/DevelopmentStage/conditions";

//STORE
import StrandlistStore from "../Store/StrandlistStore";

export default class DevelopmentStageLayout extends React.Component {
	
	constructor(){
		super();
		this.updatedisplay = this.updatedisplay.bind(this)
		this.state = {activedisplay1: StrandlistStore.getActiveDisplay1()}
	}
	componentWillMount() {
		StrandlistStore.on("Change_ActiveDisplay1",this.updatedisplay);
	}
	componentWillUnmount() {
		StrandlistStore.removeListener("Change_ActiveDisplay1",this.updatedisplay);
	}

	updatedisplay(){
		this.setState({ activedisplay1: StrandlistStore.getActiveDisplay1()})
	}

	ComponentDisplay(){
		switch(this.state.activedisplay1){
			case "1":{
				return <Overview/>
			}
			case "2":{
				return <Strandinput/>
			}
		}
	}


	render(){
		const Barstyle = {
			height: "55px", width: "425px"
		}
		const Stranddisplaystyle = {
			width:"950px",position:"relative",top:"-500px",left:"425px",backgroundColor:"white"
		}
		const Workspacestyle = {
			backgroundColor:"white", width: "380px", height:"500px", marginLeft:"20px"
		}
		const text1style = {
			fontFamily:"'Pavanam',serif",textAlign:"center", fontWeight:'bold',paddingTop:"20px",fontSize:"22px"
		}
		const text2style = {
			fontFamily:"'Pavanam',serif",textAlign:"center", fontWeight:'bold',paddingTop:"10px",marginBottom:"20px",fontSize:"13px",
		}

		return(
			<div>
				<ProjectNavigationBar/>
		
				<div style = {Workspacestyle}>
					<div style = {text1style}>Stage 1: Project Workspace</div>
					<div style = {text2style}>use this space to input your desired strands along with the solution conditions of the experiment</div>
					<div style={Barstyle}> <Sidebar/> </div>
					{this.ComponentDisplay()}
				</div>
		
				<div style = {Stranddisplaystyle}>
					<Stranddisplay/>
				</div>

			</div>
		);
	}
}