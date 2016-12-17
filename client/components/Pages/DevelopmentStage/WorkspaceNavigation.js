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
				height:"52px",
				fontSize:"15px", 	
				fontFamily: "'Dosis', serif " ,
				color:"white",
				width:"1045px",
				display:"block",
				marginBottom:"20px"

			}
			let itemstyle = {    
				background:"rgba(0, 34, 51,.5)", 
				display:"inline-block",
				width:"348px", 
				padding:"15px 0px 15px 0px",
				textAlign:"center", 
				verticalAlign:"top",
				cursor:"pointer",
			}
			let highlightstyle = {
				background:"rgba(0, 34, 51,.8)", 
				display:"inline-block", 
				width:"349px",
				padding:"15px 0px 15px 0px",
				textAlign:"center", 
				verticalAlign:"top",
				fontWeight:"bold",
				textDecoration:"underline"
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
		return(		
		<div> 
			{this.rendertabs()} 
		</div>
		);
	}
}