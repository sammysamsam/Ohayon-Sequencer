import React from "react";
import Sequencer from "../../Pages/SequencingStage/Sequencer";
import SequencingStrandTable from "../../Pages/SequencingStage/SequencingStrandTable";

import Glyphicon from 'react-bootstrap/lib/Glyphicon'

//STORE
import StrandlistStore from "../../Store/StrandlistStore";


export default class SequencingStageLayout extends React.Component {
	
	constructor(){
		super();
		this.updateconditions = this.updateconditions.bind(this);
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatestatus = this.updatestatus.bind(this);
		this.state = {  
						Salt: StrandlistStore.getConditions().Salt, 
						Concentration: StrandlistStore.getConditions().Concentration,
						Component_List: StrandlistStore.getStrandComponents(),
						sequencerstatus: StrandlistStore.getJavaProgramStatus(),
						sequencertimeout: StrandlistStore.getSequencerTimeout()
					}
	}
	componentWillMount() {
		StrandlistStore.on("Change_Condition", this.updateconditions);
		StrandlistStore.on("Change_Component_Strandlist",this.updateComponentlist);
		StrandlistStore.on("Java_Status_Updater",this.updatestatus);
		StrandlistStore.on("Update_Sequencer_Status",this.updatesequencerstatus);
	}
	componentWillUnmount() {
		StrandlistStore.removeListener("Change_Condition", this.updateconditions)
		StrandlistStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		StrandlistStore.removeListener("Java_Status_Updater",this.updatestatus);
		StrandlistStore.removeListener("Update_Sequencer_Status",this.updatesequencerstatus);

	}
	updatesequencerstatus(){
		this.setState({ sequencertimeout: StrandlistStore.getSequencerTimeout() });
	}
	updateconditions(){
		this.setState({ Salt: StrandlistStore.getConditions().Salt})
		this.setState({ Concentration: StrandlistStore.getConditions().Concentration})
	}
	updateComponentlist(){
		this.setState( {Component_List: StrandlistStore.getStrandComponents()});
	}
	updatestatus(){
			this.setState( {strandlistlength: StrandlistStore.getStrandComponents().length, sequencerstatus: StrandlistStore.getJavaProgramStatus() })
	}
	render(){

		let topstyle = {
			fontFamily:"'roboto','raleway',serif",
			padding:"35px",
			color:"white",
			background:"rgba(28, 50, 74,.8)",   
			width:"1065px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
			textAlign:"center"
		}
		let middlestyle = {
			marginTop:"3px",
			padding:"15px 0px 0px 400px",
			background:"rgba(28, 50, 74,.63)", 
			width:"1063px",
			height:"87px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)"
		}
		let bottomstyle = {
			marginTop:"3px",
			padding:"10px 0px 0px 5px",
			background:"rgba(28, 50, 74,.88)",
			background:"rgba(28, 50, 74,.73)",
			width:"1065px",
			height:"534px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)"
		}

		return(
		<div >		
			<div style = {topstyle}>
					<h1> SEQUENCING ALGORITHM </h1>
					<h5 style = {{width:"1000px",paddingTop:"10px"}}> Read over your Strand Components and start the sequencing algorithm when everything is properly inputed. (optional) set maximum time allocated for sequencing any set of strands (range: 1- 6 hours) </h5>
			</div>
			
			<div className= "animated fadeIn"  style = {middlestyle}>
				<Sequencer status = {this.state.sequencerstatus} componentlength = {this.state.Component_List.length}/>
			</div>

			<div className= "animated fadeIn"  style  = {bottomstyle}>
					<SequencingStrandTable/>
			</div>
		</div>
		);

	}
}