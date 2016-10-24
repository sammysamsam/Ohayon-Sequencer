import React from "react";

import Conditions from "./conditions";

//STORE
import StrandlistStore from "../../Store/StrandlistStore";

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Overview extends React.Component {

	constructor(){
		super();
		this.updatename = this.updatename.bind(this);
		this.state = {name:StrandlistStore.getName()}
	};
	componentWillMount() {
		StrandlistStore.on("Change_Name",this.updatename);

	}
	componentWillUnmount() {
		StrandlistStore.on("Change_Name",this.updatename);
	}
	updatename(){
		this.setState({ name:thisStrandlistStore.getName() });
	}
	editProjectName(c){
		StrandAction.EditProjectName(c);
	}


	render(){
		var projectname = this.state.projectname;
		return(
			<Conditions/>
		)
	}
}