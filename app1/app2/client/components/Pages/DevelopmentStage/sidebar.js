import React from "react";

//STORE
import StrandlistStore from "../../Store/StrandlistStore";

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Sidebar extends React.Component {

	constructor(){
		super();
		this.updatesidebar = this.updatesidebar.bind(this);
		this.state = {activedisplay1: StrandlistStore.getActiveDisplay1()}
	}
	componentWillMount() {
		StrandlistStore.on("Change_ActiveDisplay1", this.updatesidebar)
	}
	componentWillUnmount() {
		StrandlistStore.removeListener("Change_ActiveDisplay1",this.updatesidebar)
	}
	updatesidebar(){
		this.setState({ activedisplay1: StrandlistStore.getActiveDisplay1()});
	}

	handleSidebarChange(e){
		switch(e){
			case "1":{
				StrandAction.EditActiveDisplay1("1");
				break;
			}
			case "2":{
				StrandAction.EditActiveDisplay1("2");
				break;
			}
			case "3":{
				StrandAction.EditActiveDisplay1("3");
				break;
			}
		}
	}

		render(){
			var itemstyle = {fontFamily: "'Dosis', serif " , fontSize:"12px",marginLeft:"25px",display:"block",width:"130px",height:"36px",padding:"10px 10px 5px 5px",textAlign:"center", backgroundColor:"#ff751a", color:"white",float:"left", opacity: "0.8",boxShadow: "3px 3px 2px grey"}
			var spaceritemstyle = {fontFamily: "'Dosis', serif " , fontSize:"12px",marginLeft:"40px",display:"block",width:"130px",height:"36px",padding:"10px 10px 5px 5px",textAlign:"center", backgroundColor:"#ff751a", color:"white",float:"left", opacity: "0.8",boxShadow: "3px 3px 2px grey"}
			return(		
			<div>
						<div style = {spaceritemstyle} onClick ={this.handleSidebarChange.bind(this, "1")}>Adjust Conditions</div>
						<div style = {itemstyle} onClick ={this.handleSidebarChange.bind(this, "2")} >Strand Input</div>
			</div>
			);
		}
}