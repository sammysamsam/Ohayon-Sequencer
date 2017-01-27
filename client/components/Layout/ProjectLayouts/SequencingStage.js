import React from "react";
import Sequencer from "../../Pages/SequencingStage/Sequencer";

//STORE
import ProjectStore from "../../Store/ProjectStore";


export default class SequencingStageLayout extends React.Component {
	
	constructor()
	{
		super();
		this.updateConditions = this.updateConditions.bind(this);
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatestatus = this.updatestatus.bind(this);
		this.updatePrompt = this.updatePrompt.bind(this);
		this.state = {  
						Salt: ProjectStore.getConditions().Salt, 
						Concentration: ProjectStore.getConditions().Concentration,
						Component_List: ProjectStore.getStrandComponents(),
						Backend_Status:  ProjectStore.getBackendStatus(),
						Prompt: ProjectStore.getSequencerPrompt(),
						TimeLimit:ProjectStore.getSequencerTimeLimit(),
					}
	}
	componentWillMount() 
	{
		ProjectStore.on("Change_Condition", this.updateConditions);
		ProjectStore.on("Change_Component_Strandlist",this.updateComponentlist);
		ProjectStore.on("Update_Backend_Status",this.updatestatus);
		ProjectStore.on("Update_Sequencer_Prompt",this.updatePrompt);
	}
	componentWillUnmount() 
	{
		ProjectStore.removeListener("Change_Condition", this.updateConditions)
		ProjectStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		ProjectStore.removeListener("Update_Backend_Status",this.updatestatus);
		ProjectStore.removeListener("Update_Sequencer_Prompt",this.updatePrompt);
	}

	updateConditions()
	{
		this.setState({ Salt: ProjectStore.getConditions().Salt})
		this.setState({ Concentration: ProjectStore.getConditions().Concentration})
	}
	updateComponentlist()
	{
		this.setState({ Component_List: ProjectStore.getStrandComponents() });
	}
	updatestatus()
	{
		this.setState({ Backend_Status: ProjectStore.getBackendStatus() })
		this.setState({ TimeLimit: ProjectStore.getSequencerTimeLimit() })
	}
	updatePrompt()
	{
		this.setState({ Prompt: ProjectStore.getSequencerPrompt() })		
	}
	render(){

		let topstyle = {
			padding:"35px 100px 0px 100px",
			background:"rgba(19, 29, 45,.68)", 
			width:"1197px",
			marginLeft:"-153px",
			height:"244px",
			boxShadow:" 9px 0px 12px -4px rgba(0,0,0,0.56)",
		}

		let bottomstyle = {
			marginTop:"2px",
			padding:"150px 0px 0px 0px",
			background:"rgba(19, 29, 45,.53)",
			width:"1044px",
			height:"692px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
			border:"solid rgba(255,255,255,.9)",
			borderWidth:"3px 0px 0px 0px"
		}

		return(
		<div >		
			<div style = {topstyle}>
					<h2 style = {{textAlign:"center",color:"#f2f2f2"}}> 
						SEQUENCING ALGORITHM 
					</h2>
					
					<h6 style = {{textAlign:"center",color:"#f2f2f2",paddingTop:"30px"}}> 
						Start the running sequencing algorithm when strand components are properly inputted, full strands are properly built and time allocated for sequencing set (range: 1- 6 hours).  
					</h6>
			</div>
			
			<div className= "animated fadeIn"  style = {bottomstyle}>
				<Sequencer time = {this.state.TimeLimit} prompt = {this.state.Prompt} status = {this.state.Backend_Status} componentlength = {this.state.Component_List.length}/>
			</div>
		</div>
		);

	}
}