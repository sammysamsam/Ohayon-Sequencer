import React from "react";
//STORE
import StrandlistStore from "../../Store/StrandlistStore";

export default class CompleteOverview extends React.Component {
		constructor(){
			super();
			this.updatestrandlist = this.updatestrandlist.bind(this)
			this.updateconditions = this.updateconditions.bind(this)
			this.state = { Salt: StrandlistStore.getConditions().Salt, Concentration: StrandlistStore.getConditions().Concentration, strandlist: StrandlistStore.getAllStrands()};
		}
		componentWillMount() {
			StrandlistStore.on("Change_Condition", this.updateconditions);
			StrandlistStore.on("Change_Strandlist",this.updatestrandlist);
		}
		componentWillUnmount() {
			StrandlistStore.removeListener("Change_Condition", this.updateconditions);
			StrandlistStore.removeListener("Change_Strandlist",this.updatestrandlist);
		}

		updateconditions(){
			this.setState({ Salt: StrandlistStore.getConditions().Salt, })
			this.setState({ Concentration: StrandlistStore.getConditions().Concentration})
		}
		updatestrandlist(){
			this.setState( {strandlist: StrandlistStore.getAllStrands() });
		}
		render(){
			const ulstyle = {
				margin:"40px 0px 40px 0px",
			}
			
			return(			
			<div>
				<h3> Conditions: </h3>
				<p> Salt (Na or Mg): {this.state.Salt} </p>
				<p> Concentration of Salt: {this.state.Concentration} </p>

				<ul style = {ulstyle}>{
					this.state.strandlist.map( (listValue) => { 
						return 	 <li key = {listValue.name}> { listValue.name + " :   "+listValue.sequence+ "| Complement: " + listValue.complement+ " mismatch limit:"+ listValue.mismatch + " hairpin limit:"+listValue.hairpin + "  || blueprint: " + listValue.blueprint}  </li>
					})
				}</ul>
			</div>
			);
		}
}