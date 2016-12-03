import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Pagination from "pagination";
import Glyphicon from 'react-bootstrap/lib/Glyphicon'


//STORE
import StrandlistStore from "../../Store/StrandlistStore";
//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class SequencingStrandTable extends React.Component {
constructor()
{
	super()
	this.updatestrandlist = this.updatestrandlist.bind(this)
	this.state = {
					strandlist: StrandlistStore.getStrandComponents(), 
					salt: StrandlistStore.getConditions().Salt, 
					Concentration: StrandlistStore.getConditions().Concentration
				}
};
componentWillMount() 
{
	StrandlistStore.on("Change_Component_Strandlist",this.updatestrandlist);
	StrandlistStore.on("Change_Condition", this.updateconditions);
}
componentWillUnmount() 
{
	StrandlistStore.removeListener("Change_Component_Strandlist",this.updatestrandlist);
	StrandlistStore.removeListener("Change_Condition", this.updateconditions);
}

updateconditions()
{
	this.setState({ Salt: StrandlistStore.getConditions().Salt})
	this.setState({ Concentration: StrandlistStore.getConditions().Concentration})
}
updatefullstrandlist()
{
	this.setState( {strandlist: StrandlistStore.getFullStrands() })
}
updatestrandlist()
{
	this.setState( {strandlist: StrandlistStore.getStrandComponents() })
}
format(cell, row)
{
		return '<i class="glyphicon glyphicon-usd"></i> ' + cell
}

render(){
	const displaystyle = {
		width:"1050px"
	}

	const conditionsstyle = {
		fontFamily:"'Anaheim',serif", 
		textAlign:"right",
		position:"relative", 
		width:"680px",
		top:"40px",
		color:"white"
	}
	const tabletopstyle = {
		 width:"1048px",
		 height:"50px",
		 padding:"15px 10px 5px 40px",
		 color:"white",
		 fontFamily: "'Anaheim', serif " ,
		 background:"rgba(57, 115, 172,0.7)",
		 margin:"1px"
	}

	const tablestyle ={
		background:"rgba(31, 64, 96,0.9)",
		height:"450px",
		margin:"0px 1px 1px 1px",
		paddingTop:"2px"
	}
	
	//
	return(
		<div style = {{height:"549px"}}>
			<div style = {displaystyle}>
			
				 
					<h4 style = {tabletopstyle}> <Glyphicon glyph = "th"/> Strand Components Table</h4>
					<div style = { tablestyle}>

						<BootstrapTable  
							option = {{sizePerPage : 20, hideSizePerPage:true}} 
							tableStyle = {{backgroundColor:"white"}}	
							data={this.state.strandlist}   
							height="390px"
							condensed = {true} 
							pagination={true} 
							striped={true} 
							hover={true}  >
			    
			    		<TableHeaderColumn 
			    			dataField="name" 
			    			isKey={true} 
			    			dataSort={true} 
			    			width = "210px"> 
			    			Name
			    		</TableHeaderColumn>
			    			<TableHeaderColumn 
			    				dataField="sequence"        
			    				dataSort={true} 
			    				width = "455px"> 
			    				Sequence   
			    			</TableHeaderColumn>
				    		<TableHeaderColumn 
				    			dataField="length"            
				    			dataSort={true} 
				    			width = "68px"> 
				    			Length 
				    		</TableHeaderColumn>
			    			<TableHeaderColumn dataField="mismatch" width = "100px"> Mismatch Limit </TableHeaderColumn>
			    			<TableHeaderColumn dataField="self" width = "90px"> self Limit </TableHeaderColumn>
			    			<TableHeaderColumn dataField="complement" > Complement </TableHeaderColumn>
						</BootstrapTable>
					</div>
				</div>
			 </div>
	)
}
}





