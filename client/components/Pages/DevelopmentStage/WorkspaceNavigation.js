import React from "react";
//STORE
import StrandlistStore from "../../Store/StrandlistStore";
import styles from '../../../StyleSheet/hover-min.css';
//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class WorkspaceNav extends React.Component {

	constructor(){
		super();
		this.updateWorkspaceNavigation = this.updateWorkspaceNavigation.bind(this);
		this.state = {activedisplay: StrandlistStore.getWorkspaceDisplay()}
	}
	componentWillMount() {
		StrandlistStore.on("Change_Workspace_Display", this.updateWorkspaceNavigation)
	}
	componentWillUnmount() {
		StrandlistStore.removeListener("Change_Workspace_Display",this.updateWorkspaceNavigation)
	}
	updateWorkspaceNavigation(){
		this.setState({ activedisplay: StrandlistStore.getWorkspaceDisplay()});
	}

	handleSidebarChange(e){
		switch(e){
			case "1":{
				StrandAction.EditWorkspaceDisplay("1");
				break;
			}
			case "2":{
				StrandAction.EditWorkspaceDisplay("2");
				break;
			}
			case "3":{
				StrandAction.EditWorkspaceDisplay("3");
				break;
			}
		}
	}
	rendertabs()
	{
			let backgroundstyle = {
				height:"60px",
				padding:"25px 0px 0px 0px",
				margin:"-20px 0px 0px 5px",
				fontSize:"16px", 	
				fontFamily: "'Dosis', serif " ,
				color:"white"
			}
			let itemstyle = {    
				background:"rgba(89, 139, 192,0.7)",
				display:"inline-block",
				width:"180px", 
				padding:"10px 0px 10px 0px",
				margin:"10px 10px 10px 10px",
				textAlign:"center", 
				verticalAlign:"top",
				cursor:"pointer"
			}
			let highlightstyle = {
				background:"rgba(0, 34, 51,.9)", 
				display:"inline-block", 
				width:"180px",
				padding:"10px 0px 10px 0px",
				textAlign:"center", 
				margin:"10px 10px 10px 10px",
				verticalAlign:"top"
			}


			if(this.state.activedisplay == "1")
			{
				return(		
						<div style = {backgroundstyle}>
							<div  style = {highlightstyle} onClick ={this.handleSidebarChange.bind(this, "1")}>Overview</div>
							<div className= "hvr-shutter-out-horizontal" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "2")} >Strand Components</div>
							<div className= "hvr-shutter-out-horizontal" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "3")} >Full Strands</div>
						</div>
				)
			}
			if(this.state.activedisplay == "2")
			{
							return(		
						<div style = {backgroundstyle}>
							<div className="hvr-shutter-out-horizontal" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "1")}>Overview</div>
							<div style = {highlightstyle} onClick ={this.handleSidebarChange.bind(this, "2")} >Strand Components</div>
							<div className="hvr-shutter-out-horizontal" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "3")} >Full Strands</div>
						</div>
					)	
			}
			else
			{
				return(		
					<div style = {backgroundstyle}>
						<div  className="hvr-shutter-out-horizontal" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "1")}>Overview</div>
						<div  className="hvr-shutter-out-horizontal" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "2")} >Strand Components</div>
						<div style = {highlightstyle} onClick ={this.handleSidebarChange.bind(this, "3")} >Full Strands</div>
						</div>
				)
			}
	}

		
	render()
	{
		return(		
		<div> 
			{this.rendertabs()} 
		</div>
		);
	}
}