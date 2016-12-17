import React from "react";
import Sequencer from "../../Pages/SequencingStage/Sequencer";
import SequencingStrandTable from "../../Pages/SequencingStage/SequencingStrandTable";

//STORE
import ProjectStore from "../../Store/ProjectStore";


export default class SequencingStageLayout extends React.Component {
	
	constructor(){
		super();
		this.updateconditions = this.updateconditions.bind(this);
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatestatus = this.updatestatus.bind(this);
		this.state = {  
						Salt: ProjectStore.getConditions().Salt, 
						Concentration: ProjectStore.getConditions().Concentration,
						Component_List: ProjectStore.getStrandComponents(),
						Backend_Status:  ProjectStore.getBackendStatus(),
					}
	}
	componentWillMount() {
		ProjectStore.on("Change_Condition", this.updateconditions);
		ProjectStore.on("Change_Component_Strandlist",this.updateComponentlist);
		ProjectStore.on("Update_Backend_Status",this.updatestatus);
	}
	componentWillUnmount() {
		ProjectStore.removeListener("Change_Condition", this.updateconditions)
		ProjectStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		ProjectStore.removeListener("Update_Backend_Status",this.updatestatus);
	}

	updateconditions(){
		this.setState({ Salt: ProjectStore.getConditions().Salt})
		this.setState({ Concentration: ProjectStore.getConditions().Concentration})
	}
	updateComponentlist(){
		this.setState( {Component_List: ProjectStore.getStrandComponents()});
	}
	updatestatus(){
		this.setState({ Backend_Status: ProjectStore.getBackendStatus() })
	}
	render(){

		let topstyle = {
			padding:"35px",
			background:"rgba(28, 50, 74,.8)",     
			width:"1197px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)", 
			textAlign:"center",
			marginLeft:"-153px",
			height:"244px"
		}
		let middlestyle = {
			marginTop:"3px",
			paddingLeft:"150px",
			background:"rgba(28, 50, 74,.85)", 
			width:"1044px",
			height:"87px",
			paddingTop:"12px"
		}
		let bottomstyle = {
			padding:"10px 0px 0px 10px",
			background:"rgba(28, 50, 74,.8)", 
			width:"1044px",
			height:"603px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)"
		}

		return(
		<div >		
			<div style = {topstyle}>
					<h2 style = {{color:"white"}}> SEQUENCING ALGORITHM </h2>
					<h6 style = {{color:"white",paddingTop:"30px"}}> Read over your Strand Components and start the sequencing algorithm when everything is properly inputed. (optional) set maximum time allocated for sequencing any set of strands (range: 1- 6 hours) </h6>
			</div>
			
			<div className= "animated fadeIn"  style = {middlestyle}>
				<Sequencer status = {this.state.Backend_Status} componentlength = {this.state.Component_List.length}/>
			</div>

			<div className= "animated fadeIn"  style  = {bottomstyle}>
					<SequencingStrandTable concentration = {this.state.concentration} salt = {this.state.Salt} strandlist = {this.state.Component_List}/>
			</div>
		</div>
		);

	}
}