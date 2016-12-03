import React from "react";
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

import ProjectNavigationBar from "../Pages/ProjectNavigationBar";
import FooterSection from "../Pages/FooterSection";
import Overview from "../Pages/DevelopmentStage/Overview";
import StrandComponentsDisplay from "../Pages/DevelopmentStage/StrandComponentsDisplay";
import FullStrandDisplay from "../Pages/DevelopmentStage/FullStrandDisplay";
import StrandComponentInput from "../Pages/DevelopmentStage/StrandComponentInput";
import WorkspaceNav from "../Pages/DevelopmentStage/WorkspaceNavigation";

//STORE
import StrandlistStore from "../Store/StrandlistStore";

export default class DevelopmentStageLayout extends React.Component {
	
	constructor(){
		super();
		this.updateconditions = this.updateconditions.bind(this);
		this.updateWorkspaceNavigation = this.updateWorkspaceNavigation.bind(this);
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatefullstrandlist = this.updatefullstrandlist.bind(this);

		this.state = {  activedisplay: StrandlistStore.getWorkspaceDisplay(),
						Salt: StrandlistStore.getConditions().Salt, 
						Concentration: StrandlistStore.getConditions().Concentration,
						Component_List: StrandlistStore.getStrandComponents(),
						Full_List: StrandlistStore.getFullStrands()
					}
	}
	componentWillMount() {
		StrandlistStore.on("Change_Workspace_Display", this.updateWorkspaceNavigation);
		StrandlistStore.on("Change_Condition", this.updateconditions);
		StrandlistStore.on("Change_Full_Strandlist",this.updatefullstrandlist);
		StrandlistStore.on("Change_Component_Strandlist",this.updateComponentlist);
	}
	componentWillUnmount() {
		StrandlistStore.removeListener("Change_Workspace_Display",this.updateWorkspaceNavigation)
		StrandlistStore.removeListener("Change_Condition", this.updateconditions)
		StrandlistStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		StrandlistStore.removeListener("Change_Full_Strandlist",this.updatefullstrandlist);
	}
	updateconditions(){
		this.setState({ Salt: StrandlistStore.getConditions().Salt})
		this.setState({ Concentration: StrandlistStore.getConditions().Concentration})
	}
	updateWorkspaceNavigation(){
		this.setState({ activedisplay: StrandlistStore.getWorkspaceDisplay()});
	}
	updateComponentlist(){
		this.setState( {Component_List: StrandlistStore.getStrandComponents()});
	}
	updatefullstrandlist(){
		this.setState( {Full_List: StrandlistStore.getFullStrands() })
	}
	ComponentDisplay(){
		switch(this.state.activedisplay){
			case "1":{
				return <Overview Salt = {this.state.Salt} Concentration = {this.state.Concentration} strandlist = {this.state.Full_List} complist = {this.state.Component_List}/>
			}
			case "2":{
				return <div style = {{paddingLeft:"30px"}}>
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
		let backgroundstyle = {
			height:"870px",
			verticalAlign:"top",
			marginLeft:"180px",
			marginTop:"-10px"
		}
		let topstyle = {
			fontFamily:"'raleway',serif",
			margin:"50px 50px 0px 4px",
			padding:"35px",
			color:"white",
			background:"rgba(28, 50, 74,.88)",     
			width:"1045px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56", 
			textAlign:"center"
		}
		let bottomstyle = {
			margin:"2px 0px 0px 4px",
			paddingTop:"37px",
			background:"rgba(28, 50, 74,.88)", 
			width:"1045px",
			height:"573px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56"
		}

		return(
		<div>
		<div style = {{marginTop:"-10px",backgroundImage: "url('http://www.lirent.net/wp-content/uploads/2014/10/Android-Lollipop-Material-Design-Wallpaper-IdeaLTriangles.png')",backgroundSize:"1300px 1000px"}}>
			
				<div style = {{background:"rgba(255,255,255,.5)"}}>
					
					<h6 style = {{color:"#ff6600",textDecoration:"none",backgroundColor:"#292B2D",height:"40px",padding:"15px 0px 0px 60px",opacity:".99"}}> 
					
						<Glyphicon glyph = "globe"/> 
					
						Optimizing Hybridization AnalYsis Of Nucleotides Program 

					</h6>
					
					<ProjectNavigationBar StageNumber = {1}/>			
				<div style = {backgroundstyle}>	
						
						<div style = {topstyle}>
							<h1> PROJECT WORKSPACE </h1>
							<h5 style = {{width:"1000px",paddingTop:"10px",paddingRight:"30px"}}>Use this space to adjust experimental solution conditions and input your desired strands components and put those components together to create your desired strands. </h5>
							<WorkspaceNav/>
						</div>
						
						<div style  = {bottomstyle}>
							{this.ComponentDisplay()}
						</div>
				</div>
			</div>
		</div>
		<FooterSection/>
		</div>
		);
	}
}