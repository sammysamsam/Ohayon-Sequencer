import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import styles from '../../../StyleSheet/react-bootstrap-table.css';
import FullStrandInput from './FullStrandInput';


//STORE
import StrandlistStore from "../../Store/StrandlistStore";
//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class FullStrandDisplay extends React.Component {
	format(cell, row){
  		return '<i class="glyphicon glyphicon-usd"></i> ' + cell
	}

	updateStoreStrandlist(e)
	{
		let data = [];
		for(let i = 0; i<this.props.strandlist.length;i++)
		{
			let checkpoint = false;
			for (let g = 0; g < e.length; g ++)
			{
				if(this.props.strandlist[i].name == e[g])
					checkpoint = true;
			}
			if(checkpoint == false)
				data.push(this.props.strandlist[i]);
		}
		if(this.props.strandlist.length != data.length)
		{
			StrandAction.Update_Full_Strandlist(data);
		}

	}

	render(){
		

		const displaytablestyle = {
			display:"inline-block",
			width:"490px",
			color:"black", 
			fontSize:"11px",
			verticalAlign:"top"
		}

		const tablestyle ={
			background:"rgba(31, 64, 96,0.9)",
			height:"462px",
			margin:"0px 1px 1px 1px",
			paddingTop:"10px"
		}

		const tabletopstyle = {
			 width:"489px",
			 height:"50px",
			 padding:"15px 10px 5px 40px",
			 color:"white",
			 fontFamily: "'Anaheim', serif " ,
			 background:"rgba(57, 115, 172,0.7)",
			 margin:"1px"
		}
		var selectRowProp = {
  			mode: "checkbox",
  			clickToSelect: true,
  			bgColor: "rgb(238, 193, 213)",
		}

		//
		return(
			<div style ={{height:"605px"}}>

				<div style = {{display:"inline-block"}}>
  		 			<FullStrandInput strandlist = {this.props.complist}/>
  		 		</div>

		 		<div style = {displaytablestyle}>
		 	 		<h4 style = {tabletopstyle}> <Glyphicon glyph = "th"/> Full Strands Table</h4>
  						<div style = {tablestyle}> 
  							<BootstrapTable 
  								tableStyle = {{backgroundColor:"white",opacity:".95"}} 
  								condensed = {true} 
  								pagination={true} 	
  								data={this.props.strandlist}   
  								deleteRow={true} 
  								striped={true} 
  								hover={true}
  								selectRow={selectRowProp}	
  								height="365px" 
  								options={ { onDeleteRow: this.updateStoreStrandlist.bind(this)}} 
  								>
    			    	
		    			    		<TableHeaderColumn 
		    			    			dataField="name" 
		    			    			isKey={true} 
		    			    			dataSort={true} 
		    			    			width = {"150px"} > 
		    			    			Name
		    			    		</TableHeaderColumn>
		   			    			<TableHeaderColumn 
		   			    				dataField="componentsdisplay"    
		   			    				dataSort={true} > 
		   			    				Components (5-3)   
		   			    			</TableHeaderColumn>
		 		 			</BootstrapTable> 
 		 			</div>
 		 		</div>
 		 	</div>
		)
	}
}





