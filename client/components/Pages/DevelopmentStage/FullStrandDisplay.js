import React from "react";
import {Row,Input} from "react-materialize";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import FullStrandInput from './FullStrandInput';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class FullStrandDisplay extends React.Component {
	constructor()
	{
		super();
		this.updateDisplay =this.updateDisplay.bind(this);
		this.state = {
			activedisplay:1
		}
	}

	//

	updateDisplay(e)
	{
		let value = e.target.value;
		console.log(value);
		this.setState({activedisplay:value});
	}
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


	renderDisplay()
	{
		let fullStrandDisplayContainer = {
			width:"1017px",
			color:"black", 
			fontSize:"11px",
			verticalAlign:"top"
		}

		let tableStyle ={
			background:"rgba(100, 153, 206,0.5)",
			height:"500px",
			margin:"0px 1px 1px 1px",
			paddingTop:"10px"
		}

		let tableHeaderStyle = {
			 width:"1015px",
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
		if(this.state.activedisplay == 1)
		{
			return(				
				<div className= "animated fadeIn" >
		 			<FullStrandInput status = {this.props.status} fulllist = {this.props.strandlist} complist = {this.props.complist}/>
		 		</div>);
		}
		else
		{
			return(		 		
				<div className= "animated fadeIn" style = {fullStrandDisplayContainer}>
		 	 		<div style = {tableHeaderStyle}>  
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">view_quilt</i>
		 	 			Full Strands Table
		 	 		</div>
					<div style = {tableStyle}> 
						<BootstrapTable 
							tableStyle = {{backgroundColor:"white",opacity:".95",height:"371px"}} 
							condensed = {true} 
							pagination={true} 	
							data={this.props.strandlist}   
 							deleteRow={!this.props.status}
							striped={true} 
							hover={true}
							selectRow={selectRowProp}	
							options={ { onDeleteRow: this.updateStoreFullStrandlist.bind(this)}} 
							>
			    		<TableHeaderColumn 
			    			dataField="name" 
			    			isKey={true} 
			    			dataSort={true} 
			    			width = {"175px"} > 
			    			Name
			    		</TableHeaderColumn>
			    		<TableHeaderColumn 
			    			dataField="fiveprime" 
			    			dataSort={true} 
			    			width = {"75px"} > 
			    			Direction
			    		</TableHeaderColumn>
			    			<TableHeaderColumn 
			    				dataField="componentsDisplay"    
			    				dataSort={true} > 
			    			Components  
			    			</TableHeaderColumn>
 		 				</BootstrapTable> 
	 				</div>
 		 		</div>);
		}
	}

	render(){


		//


		return(
			<div>
				<Row >
				<Input 		
					name="fullstranddisplay" 
					value = {1} 
					defaultChecked={true}
					label = "Input" 
					type="radio"  
					onClick = {this.updateDisplay}
					 className='with-gap'
					/>   
				<Input 
					name="fullstranddisplay" 
					value = {2} 
					label = "Table" 
					type="radio"  
					 className='with-gap'
					onClick = {this.updateDisplay} 
				/>  
				</Row>

				{this.renderDisplay()}

 		 	</div>
		)
	}
}

