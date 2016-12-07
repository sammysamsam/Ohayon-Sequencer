import React from "react";
import StrandComparison from "../../Pages/ResultStage/StrandComparison";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

//STORE
import StrandlistStore from "../../Store/StrandlistStore";

export default class ResultStateLayout extends React.Component {

	constructor(){
		super()
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatefullstrandlist = this.updatefullstrandlist.bind(this);
		this.updatestatus = this.updatestatus.bind(this);
		this.updateresults = this.updateresults.bind(this);
		this.state = {  
				Results:StrandlistStore.getDataAnalysisResults(),
				Salt: StrandlistStore.getConditions().Salt, 
				Concentration: StrandlistStore.getConditions().Concentration,
				Component_List: StrandlistStore.getStrandComponents(),
				Full_List: StrandlistStore.getFullStrands(),
				programstatus: StrandlistStore.getJavaProgramStatus()
			}
	};

	componentWillMount() {
		StrandlistStore.on("Update_Results",this.updateresults);
		StrandlistStore.on("Java_Status_Updater",this.updatestatus);
		StrandlistStore.on("Change_Condition", this.updateconditions);
		StrandlistStore.on("Change_Full_Strandlist",this.updatefullstrandlist);
		StrandlistStore.on("Change_Component_Strandlist",this.updateComponentlist);
	}
	componentWillUnmount() {
		StrandlistStore.removeListener("Update_Results",this.updateresults);
		StrandlistStore.removeListener("Java_Status_Updater",this.updatestatus)
		StrandlistStore.removeListener("Change_Condition", this.updateconditions)
		StrandlistStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		StrandlistStore.removeListener("Change_Full_Strandlist",this.updatefullstrandlist);
	}
	updateconditions(){
		this.setState({ Salt: StrandlistStore.getConditions().Salt})
		this.setState({ Concentration: StrandlistStore.getConditions().Concentration})
	}
	updateComponentlist(){
		this.setState( {Component_List: StrandlistStore.getStrandComponents()});
	}
	updatefullstrandlist(){
		this.setState( {Full_List: StrandlistStore.getFullStrands() })
	}
	updatestatus(){
		this.setState( {sequencerstatus: StrandlistStore.getJavaProgramStatus() })
	}
	updateresults(){
		this.setState({	Results:StrandlistStore.getDataAnalysisResults() });
	}
	render(){
		let topstyle = {
			fontFamily:"'roboto','raleway',serif",
			padding:"20px 0px 10px 0px ",
			color:"white",
			background:"rgba(28, 50, 74,.8)",  
			width:"1065px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
			textAlign:"center"
		}
		let bottomstyle = {
			marginTop:"3px",
			width:"1065px",
			height:"665px"
		}

		return(
		<div >
			<div style = {topstyle}>
				<h1> DATA ANALYSIS </h1>
				<h5 style = {{width:"1000px",paddingTop:"10px"}}>Select one or two strands to see a full comparison between either the strand vs itself or the strand and its complement vs another strand. </h5>
			</div>

			<div className= "animated fadeIn" style  = {bottomstyle}>
				<StrandComparison fulllist = {this.state.Full_List} componentlist = {this.state.Component_List} results = {this.state.Results} status = {this.state.programstatus}/>
			</div>
		</div>
		);
	}
}