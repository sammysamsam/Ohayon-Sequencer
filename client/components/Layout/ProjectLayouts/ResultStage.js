import React from "react";
import StrandComparison from "../../Pages/ResultStage/StrandComparison";
import ResultStageButtons from "../../Pages/ResultStage/ResultStageButtons";


//STORE
import ProjectStore from "../../Store/ProjectStore";

export default class ResultStateLayout extends React.Component {

	constructor(){
		super()
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatefullstrandlist = this.updatefullstrandlist.bind(this);
		this.updateBackendStatus = this.updateBackendStatus.bind(this);
		this.updateresults = this.updateresults.bind(this);
		this.updateconditions = this.updateconditions.bind(this);
		this.state = {  
				Results:ProjectStore.getDataAnalysisResults(),
				Salt: ProjectStore.getConditions().Salt, 
				Concentration: ProjectStore.getConditions().Concentration,
				Component_List: ProjectStore.getStrandComponents(),
				Full_List: ProjectStore.getFullStrands(),
				Backend_Status:  ProjectStore.getBackendStatus()
			}
	};

	componentWillMount() {
		ProjectStore.on("Update_Results",this.updateresults);
		ProjectStore.on("Update_Backend_Status",this.updateBackendStatus);
		ProjectStore.on("Change_Condition", this.updateconditions);
		ProjectStore.on("Change_Full_Strandlist",this.updatefullstrandlist);
		ProjectStore.on("Change_Component_Strandlist",this.updateComponentlist);
	}
	componentWillUnmount() {
		ProjectStore.removeListener("Update_Results",this.updateresults);
		ProjectStore.removeListener("Update_Backend_Status",this.updateBackendStatus)
		ProjectStore.removeListener("Change_Condition", this.updateconditions)
		ProjectStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		ProjectStore.removeListener("Change_Full_Strandlist",this.updatefullstrandlist);
	}
	updateconditions(){
		this.setState({ Salt: ProjectStore.getConditions().Salt})
		this.setState({ Concentration: ProjectStore.getConditions().Concentration})
	}
	updateComponentlist(){
		this.setState( {Component_List: ProjectStore.getStrandComponents()});
	}
	updatefullstrandlist(){
		this.setState( {Full_List: ProjectStore.getFullStrands() })
	}
	updateBackendStatus(){
		this.setState( {Backend_Status: ProjectStore.getBackendStatus()})
	}
	updateresults(){
		this.setState({	Results:ProjectStore.getDataAnalysisResults() });
	}
	render(){
		let topstyle = {
			paddingTop:"21px",
			background:"rgba(19, 29, 45,.68)",
			width:"1198px", 
			margin:"0px 0px 3px -153px",
			height:"243px",
			boxShadow:" 9px 0px 12px -4px rgba(0,0,0,0.56)",
			zIndex:"10"
		}
		let bottomstyle = {
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
			background:"rgba(230, 230, 230,.9)",
			display:"block",
			marginTop:"2px",
			height:"688px",
			width:"1045px",
			borderWidth:"7px 0px 0px 0px",
			zIndex:"10"
		}
		return(
		<div >
			<div style = {topstyle}>
				<h2 style = {{textAlign:"right",color:"#f2f2f2",height:"80px",margin:"0",padding:"20px 100px 0px 50px"}}> 
				
					DATA ANALYSIS 

				</h2>
				
				<p style = {{textAlign:"right", padding:"30px 100px 17px 50px", color:"#f2f2f2", margin:"0"}}>
					Main features include calculating base-pair matching or melting point between two strands or all strands (components vs components / full strand vs full strand) and printing out your strands.  
				</p>
				
				<div style = {{marginTop:"10px"}}>
					<ResultStageButtons status = {this.state.Backend_Status}/>
				</div>
			</div>

			<div style = {bottomstyle} className= "animated fadeIn">
				<StrandComparison fulllist = {this.state.Full_List} componentlist = {this.state.Component_List} results = {this.state.Results} status = {this.state.Backend_Status}/>
			</div>
		</div>
		);
	}
}