import React from "react";

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class WorkspaceNav extends React.Component {

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
				height:"45px",
				fontSize:"14px", 	
				fontFamily:"'Roboto',serif",
				color:"#4e4e4f",
				display:"block",
			}
			let itemstyle = {    
				background:"rgba(255,255,255,.7)",
				display:"inline-block",
				width:"200px", 
				padding:"12px 0px 12px 0px",
				textAlign:"center", 
				verticalAlign:"top",
				cursor:"pointer",
			}
			let highlightstyle = {
				background:"rgba(255,255,255,.9)",
				display:"inline-block", 
				width:"200px",
				padding:"12px 0px 12px 0px",
				textAlign:"center", 
				verticalAlign:"top",
				fontWeight:"bold",
				textDecoration:"underline",
			}


			if(this.props.activeDisplay == "1")
			{
				return(		
					<div style = {backgroundstyle}>
						<div  style = {highlightstyle} onClick ={this.handleSidebarChange.bind(this, "1")}>Overview</div>
						<div className= "hvr-underline-from-center" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "2")} >Strand Components</div>
						<div className= "hvr-underline-from-center" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "3")} >Full Strands</div>
					</div>
				)
			}
			if(this.props.activeDisplay == "2")
			{
				return(		
					<div style = {backgroundstyle}>
						<div className="hvr-underline-from-center" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "1")}>Overview</div>
						<div style = {highlightstyle} onClick ={this.handleSidebarChange.bind(this, "2")} >Strand Components</div>
						<div className="hvr-underline-from-center" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "3")} >Full Strands</div>
					</div>
				)	
			}
			else
			{
				return(		
					<div style = {backgroundstyle}>
						<div className="hvr-underline-from-center" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "1")}>Overview</div>
						<div className="hvr-underline-from-center" style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "2")} >Strand Components</div>
						<div style = {highlightstyle} onClick ={this.handleSidebarChange.bind(this, "3")} >Full Strands</div>
					</div>
				)
			}
	}
		
	render()
	{
		let position = {
			marginTop:"25px",
			float:"right",
		}
		return(		
		<div style = {position}> 
			{this.rendertabs()} 
		</div>
		);
	}
}