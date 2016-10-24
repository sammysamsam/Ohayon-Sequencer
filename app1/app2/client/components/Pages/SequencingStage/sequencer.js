import React from "react";
//STORE
import StrandlistStore from "../../Store/StrandlistStore";

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Sequencer extends React.Component {
		constructor(){
			super();
			this.updatestatus = this.updatestatus.bind(this);
			this.state = {strandlistLength:StrandlistStore.getAllStrands().length, sequencerstatus: StrandlistStore.getSequencerStatus()};
		}
		componentWillMount() {
			StrandlistStore.on("Change_Strandlist", this.updatestatus);
			StrandlistStore.on("Update_Sequencer_Status",this.updatestatus);
		}
		componentWillUnmount() {
			StrandlistStore.removeListener("Change_Strandlist", this.updatestatus);
			StrandlistStore.removeListener("Update_Sequencer_Status",this.updatestatus);
		}
		updatestatus(){
			this.setState( {strandlistlength: StrandlistStore.getAllStrands().length, sequencerstatus: StrandlistStore.getSequencerStatus()  })
		}

		activatesequencer(){
			StrandAction.SequenceStrandlist();
		}

		ComponentDisplay(){
			var seqingbuttonstyle = {
				height:"30px",width:"110px", backgroundColor:"grey",color:"white", textAlign:"center",paddingTop:"10px", marginLeft:"150px"
			}
			var seqbuttonstyle = {
				height:"30px",width:"110px", backgroundColor:"black",color:"white", textAlign:"center",paddingTop:"10px", marginLeft:"150px"
			}
			switch(this.state.sequencerstatus){
				case true:{
					return <div style = {seqingbuttonstyle} > Sequencing... </div>
				}
				case false:{
					return <div style = {seqbuttonstyle} onClick = {this.activatesequencer}> Sequence </div>
				}
			}
		}

		render(){


			return(			
			<div>
				{this.ComponentDisplay()}
			</div>
			);
		}
}