import React from "react";
import ProjectNavigationBar from "../Pages/projectnavigationbar";

//STORE
import StrandlistStore from "../Store/StrandlistStore";

//ACTION
import * as StrandAction from "../Actions/StrandAction";

export default class ResultStateLayout extends React.Component {
		constructor(){
			super();
			this.updatestatus = this.updatestatus.bind(this);
			this.updateresults = this.updateresults.bind(this);
			this.state = { resultDisplay: StrandlistStore.getResults()  , strandlist : StrandlistStore.getAllStrands()  ,   sequencerstatus : StrandlistStore.getSequencerStatus()};
		}
		componentWillMount() {
			StrandlistStore.on("Change_Strandlist", this.updatestatus);
			StrandlistStore.on("Update_Results_Screen",this.updateresults);
		}
		componentWillUnmount() {
			StrandlistStore.removeListener("Change_Strandlist", this.updatestatus);
			StrandlistStore.removeListener("Update_Results",this.updateresults);
		}
		updatestatus(){
			this.setState( {strandlistlength: StrandlistStore.getAllStrands(), sequencerstatus: StrandlistStore.getSequencerStatus()  })
		}
		updateresults(){
			this.setState({ resultDisplay:StrandlistStore.getResults()})
		}
	render(){
		return(
			<div>
				<ProjectNavigationBar/>
				<h1> resultstatelayout  </h1>

			</div>
		);
	}
}