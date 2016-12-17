import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class SequencingStrandTable extends React.Component {

render(){
	let headerStyle = {
		 width:"1028px",
		 height:"50px",
		 padding:"10px 0px 0px 40px",
		 color:"white",
		 fontSize:"16px",
		 background:"rgba(139, 179, 218,0.7)",
		 marginBottom:"1px"
	}

	let tableStyle ={
		background:"rgba(100, 153, 206,0.5)",
		height:"530px",
		width:"1028px",
		paddingTop:"2px"
	}
	
	//
	return(
		<div>			 
			<div style = {headerStyle}> 
				<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">view_quilt</i>
				Strand Components Table
				</div>
			<div style = { tableStyle}>

				<BootstrapTable  
					option = {{sizePerPage : 20, hideSizePerPage:true}} 

					tableStyle = {{backgroundColor:"white"}}	
					data={this.props.strandlist}   
					height="455px"
					condensed = {true} 
					pagination={true} 
					striped={true} 
					hover={true}  >
	    
	    		<TableHeaderColumn 
	    			dataField="name" 
	    			isKey={true} 
					dataAlign="center"
					dataSort={true} 
	    			width = "210px"> 
	    			Name
	    		</TableHeaderColumn>
	    			<TableHeaderColumn 
	    				dataField="sequence"        
	    				dataSort={true} 
	    				width = "450px"> 
	    				Sequence   
	    			</TableHeaderColumn>
		    		<TableHeaderColumn 
		    			dataField="length"            
		    			dataSort={true} 
		    			width = "60px"> 
		    			Length 
		    		</TableHeaderColumn>
		    		<TableHeaderColumn 					dataAlign="center"dataField="meltingpoint" width = "100px"> Melting Point </TableHeaderColumn>
	    			<TableHeaderColumn 					dataAlign="center"dataField="mismatch" width = "90px"> Mismatch </TableHeaderColumn>
	    			<TableHeaderColumn 					dataAlign="center"dataField="self" width = "98px"> Self-Mismatch </TableHeaderColumn>
	    			<TableHeaderColumn 					dataAlign="center"dataField="complement" > Complement </TableHeaderColumn>
				</BootstrapTable>
			</div>
	 </div>
	)
}
}





