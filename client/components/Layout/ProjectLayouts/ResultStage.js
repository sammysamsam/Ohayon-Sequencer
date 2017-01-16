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
				programstatus:  ProjectStore.getBackendStatus()
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
		this.setState( {sequencerstatus: ProjectStore.getBackendStatus()})
	}
	updateresults(){
		this.setState({	Results:ProjectStore.getDataAnalysisResults() });
	}
	render(){
		let topstyle = {
			paddingTop:"35px",
			background:"rgba(28, 50, 74,.8)",     
			width:"1198px", 
			textAlign:"center",
			margin:"0px 0px 3px -153px",
			height:"243px",
		}

		return(
		<div >
			<div style = {topstyle}>
				<h2 style = {{color:"#ffccbc",height:"80px",margin:"0",paddingTop:"20px"}}> 
				
					DATA ANALYSIS 

				</h2>
				
				<p style = {{paddingTop:"35px",color:"#ffccbc",height:"70px",margin:"0"}}>Select one or two strands to see a full comparison between either the strand vs itself or the strand and its complement vs another strand. </p>
				
				<div style = {{height:"60px",paddingTop:"5px",margin:"0"}}>
					<ResultStageButtons status = {this.state.programstatus}/>
				</div>
			</div>

			<div className= "animated fadeIn">
				<StrandComparison fulllist = {this.state.Full_List} componentlist = {this.state.Component_List} results = {this.state.Results} status = {this.state.programstatus}/>
			</div>
		</div>
		);
	}
}