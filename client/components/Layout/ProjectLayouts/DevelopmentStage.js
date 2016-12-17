import React from "react";

import Overview from "../../Pages/DevelopmentStage/Overview";
import StrandComponentsDisplay from "../../Pages/DevelopmentStage/StrandComponentsDisplay";
import FullStrandDisplay from "../../Pages/DevelopmentStage/FullStrandDisplay";
import StrandComponentInput from "../../Pages/DevelopmentStage/StrandComponentInput";
import WorkspaceNav from "../../Pages/DevelopmentStage/WorkspaceNavigation";

//STORE
import ProjectStore from "../../Store/ProjectStore";

export default class DevelopmentStageLayout extends React.Component {
	
	constructor(){
		super();
		this.updateconditions = this.updateconditions.bind(this);
		this.updateWorkspaceNavigation = this.updateWorkspaceNavigation.bind(this);
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatefullstrandlist = this.updatefullstrandlist.bind(this);

		this.state = {  activedisplay: ProjectStore.getWorkspaceDisplay(),
						Salt: ProjectStore.getConditions().Salt, 
						Concentration: ProjectStore.getConditions().Concentration,
						Component_List: ProjectStore.getStrandComponents(),
						Full_List: ProjectStore.getFullStrands()
					}
	}
	componentWillMount() {
		ProjectStore.on("Change_Workspace_Display", this.updateWorkspaceNavigation);
		ProjectStore.on("Change_Condition", this.updateconditions);
		ProjectStore.on("Change_Full_Strandlist",this.updatefullstrandlist);
		ProjectStore.on("Change_Component_Strandlist",this.updateComponentlist);
	}
	componentWillUnmount() {
		ProjectStore.removeListener("Change_Workspace_Display",this.updateWorkspaceNavigation)
		ProjectStore.removeListener("Change_Condition", this.updateconditions)
		ProjectStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		ProjectStore.removeListener("Change_Full_Strandlist",this.updatefullstrandlist);
	}
	updateconditions(){
		this.setState({ Salt: ProjectStore.getConditions().Salt})
		this.setState({ Concentration: ProjectStore.getConditions().Concentration})
	}
	updateWorkspaceNavigation(){
		this.setState({ activedisplay: ProjectStore.getWorkspaceDisplay()});
	}
	updateComponentlist(){
		this.setState( {Component_List: ProjectStore.getStrandComponents()});
	}
	updatefullstrandlist(){
		this.setState( {Full_List: ProjectStore.getFullStrands() })
	}
	ComponentDisplay(){
		switch(this.state.activedisplay){
			case "1":{
				return <Overview Salt = {this.state.Salt} Concentration = {this.state.Concentration} strandlist = {this.state.Full_List} complist = {this.state.Component_List}/>
			}
			case "2":{
				return <div style = {{paddingLeft:"10px"}}>
					<StrandComponentsDisplay Component_list = {this.state.Component_List} Salt = {this.state.Salt} Concentration = {this.state.Concentration}/>
				</div>
			}
			case "3":{
				return <div style = {{paddingLeft:"10px"}} >
					<FullStrandDisplay complist = {this.state.Component_List} strandlist = {this.state.Full_List}/>
				</div>
			}
		}
	}


	render(){
		let topstyle = {
			padding:"45px",
			background:"rgba(28, 50, 74,.8)",     
			width:"1198px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)", 
			textAlign:"center",
			marginLeft:"-153px",
			height:"244px",
		}
		let bottomstyle = {
			marginTop:"2px",
			background:"rgba(28, 50, 74,.8)", 
			width:"1045px",
			height:"693px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)"
		}

		return(
		<div>
			<div style = {topstyle} >
				<h2 style = {{color:"white"}}> PROJECT WORKSPACE </h2>
				<h6 style = {{color:"white",paddingTop:"30px",height:"45px"}}>Use this space to adjust experimental solution conditions and input your desired strands components and put those components together to create your desired strands. </h6>
			</div>
			
			<div style  = {bottomstyle}>
				<WorkspaceNav activeDisplay = {this.state.activedisplay}/>
				{this.ComponentDisplay()}
			</div>
		</div>
		);
	}
}