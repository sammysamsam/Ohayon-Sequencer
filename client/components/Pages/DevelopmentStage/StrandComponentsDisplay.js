import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import StrandComponentInput from './StrandComponentInput'

import 'react-bootstrap-table/css/react-bootstrap-table.css';

//STORE
import StrandlistStore from "../../Store/StrandlistStore";
//ACTION
import * as StrandAction from "../../Actions/StrandAction";



export default class StrandComponentsDisplay extends React.Component {

	format(cell, row)
	{
  		return '<i class="glyphicon glyphicon-usd"></i> ' + cell
	}

	updateStoreStrandlist(updatedstrandlist)
	{
		let data = [];

		//delete full strands that contain component
		let deletedcomponent;

		for(let i = 0; i<this.props.Component_list.length;i++)
		{
			let checkpoint = false;
			for (let g = 0; g < updatedstrandlist.length; g ++)
			{
				if(this.props.Component_list[i].name == updatedstrandlist[g])
				{
					checkpoint = true;
					deletedcomponent = this.props.Component_list[i].name;
				}
			}			
			if(checkpoint == false)
				data.push(this.props.Component_list[i]);
		}
		
		if(this.props.Component_list.length != data.length)
		{
			let x = {updatedComponentlist:data,deletedComponent:deletedcomponent}
			
			StrandAction.Update_Component_Strandlist(x);
		}
	}

	render()
	{
		
		//  inline styles
		const conditionStyle = {
			fontFamily:"'Anaheim',serif", 
			textAlign:"right",
			position:"relative", 
			width:"685px",
			top:"40px",
			color:"white"
		}
		const tableHeaderStyle = {
			 width:"693px",
			 height:"50px",
			 padding:"15px 10px 5px 40px",
			 color:"white",
			 fontFamily: "'Anaheim', serif " ,
			 background:"rgba(139, 179, 218,0.7)",
			 margin:"1px"
		}

		const tableBodyStyle ={
			background:"rgba(100, 153, 206,0.5)",
			height:"440px",
			margin:"-9px 1px 1px 1px"
		}
		//
		const selectRowProp = {
  			mode: "checkbox",
  			clickToSelect: true,
  			width:"15px",
  			bgColor: "rgb(238, 193, 213)",
		}
		return(
			<div style = {{height:"620px",marginLeft:"0px"}}>

				<div className= "animated fadeInUp" style = {{display:"inline-block",marginTop:"-9px"}}>
					<StrandComponentInput strandlist = {this.props.Component_list}/>
				</div>


				<div className= "animated fadeInUp" style = {{display:"inline-block",width:"695px",verticalAlign:"top",marginLeft:"5px"}}>
				
 					<h4 style = {tableHeaderStyle}> <Glyphicon glyph = "th"/>  Strand Components Table</h4>
  					
  					<div style = { tableBodyStyle}>
						<h6 style  = {conditionStyle}> Salt (Na or Mg): {this.props.Salt}  ,  Concentration of Salt: {this.props.Concentration}</h6> 
 
  						<BootstrapTable  
  							tableStyle = {{backgroundColor:"#f2f4f7",opacity:".95"}}	
  							data={this.props.Component_list}   
  							height="330px"
  							condensed = {true} 
  							pagination={true} 
  							striped={true} 
  							hover={true}  
  							deleteRow={true}
  							selectRow={selectRowProp}	
  							options={ { onDeleteRow: this.updateStoreStrandlist.bind(this)}} >
    			    
	    			    	<TableHeaderColumn 
	    			    		dataField="name" 
	    			    		isKey={true} 
	    			    		dataSort={true} 
	    			    		width = "140px"> 
	    			    		Name
	    			    	</TableHeaderColumn>
	   			    		
	   			    		<TableHeaderColumn 
	   			    			dataSort={true} 
	   			    			dataField="blueprint"  
	   			    			width = "220px">
	   			    			Blueprint   
	   			    		</TableHeaderColumn>
	 				    	
	 				    	<TableHeaderColumn dataField="meltingpoint" width = "70px"> Melting Pt. </TableHeaderColumn>
	 				    	
	 				    	<TableHeaderColumn dataField="length"  width = "50px"> Length </TableHeaderColumn>

	 			    		<TableHeaderColumn dataField="mismatch" width = "63px"> Mismatch </TableHeaderColumn>
	 			    		
	 			    		<TableHeaderColumn 	dataField="self" width = "50px"> Self-Mis. </TableHeaderColumn>
	 			    		
	 			    		<TableHeaderColumn dataField="complement"> Comp. </TableHeaderColumn>
 						</BootstrapTable>
 					
 					</div>
 				</div>
 			 </div>
		)
	}
}





