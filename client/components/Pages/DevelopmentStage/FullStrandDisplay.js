import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import styles from '../../../StyleSheet/react-bootstrap-table.css';
import FullStrandInput from './FullStrandInput';


import 'react-bootstrap-table/css/react-bootstrap-table.css';
//STORE
import StrandlistStore from "../../Store/StrandlistStore";
//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class FullStrandDisplay extends React.Component {
	format(cell, row){
  		return '<i class="glyphicon glyphicon-usd"></i> ' + cell
	}

	updateStoreStrandlist(input)
	{
		let data = [];
		for(let i = 0; i<this.props.strandlist.length;i++)
		{
			let checkpoint = false;
			for (let g = 0; g < input.length; g ++)
			{
				if(this.props.strandlist[i].name == input[g])
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
		let fullStrandDisplayContainer = {
			display:"inline-block",
			width:"490px",
			color:"black", 
			fontSize:"11px",
			verticalAlign:"top"
		}

		let tableStyle ={
			background:"rgba(100, 153, 206,0.5)",
			height:"462px",
			margin:"0px 1px 1px 1px",
			paddingTop:"10px"
		}

		let tableHeaderStyle = {
			 width:"489px",
			 height:"50px",
			 padding:"15px 10px 5px 40px",
			 color:"white",
			 fontFamily: "'Anaheim', serif " ,
			background:"rgba(139, 179, 218,0.7)",
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

				<div className= "animated fadeInUp" style = {{display:"inline-block"}}>
  		 			<FullStrandInput strandlist = {this.props.complist}/>
  		 		</div>

		 		<div className= "animated fadeInUp" style = {fullStrandDisplayContainer}>
		 	 		<h4 style = {tableHeaderStyle}> <Glyphicon glyph = "th"/> Full Strands Table</h4>
  						<div style = {tableStyle}> 
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
		   			    				dataField="componentsDisplay"    
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

