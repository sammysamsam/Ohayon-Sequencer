import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import FullStrandInput from './FullStrandInput';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class FullStrandDisplay extends React.Component {
	updateStoreFullStrandlist(input)
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
			height:"548px",
			margin:"0px 1px 1px 1px",
			paddingTop:"10px"
		}

		let tableHeaderStyle = {
			 width:"489px",
			 height:"50px",
			 padding:"10px 10px 5px 40px",
			 color:"white",
			 background:"rgba(139, 179, 218,0.7)",
			 margin:"1px",
			 fontSize:"16px"
		}
		var selectRowProp = {
  			mode: "checkbox",
  			clickToSelect: true,
  			bgColor: "rgb(238, 193, 213)",
		}

		//
		return(
			<div>

				<div className= "animated fadeInUp" style = {{display:"inline-block"}}>
  		 			<FullStrandInput  fulllist = {this.props.strandlist} complist = {this.props.complist}/>
  		 		</div>

		 		<div className= "animated fadeInUp" style = {fullStrandDisplayContainer}>
		 	 		<div style = {tableHeaderStyle}>  
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">view_quilt</i>
		 	 			Full Strands Table
		 	 		</div>
					<div style = {tableStyle}> 
						<BootstrapTable 
							tableStyle = {{backgroundColor:"white",opacity:".95",height:"421px"}} 
							condensed = {true} 
							pagination={true} 	
							data={this.props.strandlist}   
							deleteRow={true} 
							striped={true} 
							hover={true}
							selectRow={selectRowProp}	
							height="410px" 
							options={ { onDeleteRow: this.updateStoreFullStrandlist.bind(this)}} 
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

