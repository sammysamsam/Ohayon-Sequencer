import React from "react";

//STORE
import StrandlistStore from "../../Store/StrandlistStore";

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Conditions extends React.Component {

		constructor(){
			super();
			this.updateconditions = this.updateconditions.bind(this);
			this.state = { Salt: StrandlistStore.getConditions().Salt, Concentration: StrandlistStore.getConditions().Concentration};
		}

		componentWillMount() {
			StrandlistStore.on("Change_Condition", this.updateconditions);
		}
		componentWillUnmount() {
			StrandlistStore.removeListener("Change_Condition", this.updateconditions);
		}

		updateconditions(){
			this.setState({ Salt: StrandlistStore.getConditions().Salt})
			this.setState({ Concentration: StrandlistStore.getConditions().Concentration})
		}

		handleSalt(e){
			if((e.target.value == "Na"|| e.target.value == "Mg")&& (e.target.value != this.state.Salt)){
				StrandAction.EditSalt(e.target.value);	
			}
		}
		handleSaltConcentration(e){
			if(e.target.value <=1 && e.target.value > 0 && e.target.value != this.state.Concentration){
				StrandAction.EditSaltConcentration(e.target.value);
			}
		}
		render(){
		const overview1style = {
			fontFamily:"'Anaheim',serif",marginLeft:"15px", fontWeight:'800',paddingTop:"20px",fontSize:"17px",textDecoration: "underline"
		}
		const overview2style = {
			fontFamily:"'Anaheim',serif",margin:"10px 0px 0px 15px ",fontSize:"13px"
		}
		const conditionstyle = { width: "200px", height:"140px", backgroundColor:"#b3edff", margin:"50px 0px 0px 25px" ,boxShadow: "4px 4px 2px grey"}
		
		const Ctext1style= {
			fontFamily:"'Anaheim',serif",marginLeft:"15px", fontWeight:'800',paddingTop:"20px",fontSize:"17px",textDecoration: "underline"
		}
		const Ctext2style= {
			fontFamily:"'Anaheim',serif",margin:"10px 0px 0px 15px ",fontSize:"13px"
		}
		return(
			<div>
			<div style = {conditionstyle}>
				<div style = {overview1style}>Current Conditions:</div>
				<div style = {overview2style}> Salt (Na or Mg): {this.state.Salt}  </div>
				<div style = {overview2style}> Concentration of Salt: {this.state.Concentration} </div>
			</div>

			<div style = {Ctext1style}> Adjust Conditions Here: </div>
			<div style = {Ctext2style}>	Salt (Na or Mg): {this.state.Salt} <input onChange = {this.handleSalt.bind(this)} /> </div>
			<div style = {Ctext2style}>	Concentration of Salt: {this.state.Concentration} <input onChange = {this.handleSaltConcentration.bind(this)} /></div>
			
			</div>
			)
		}
}