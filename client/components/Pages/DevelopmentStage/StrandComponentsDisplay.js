import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import StrandComponentInput from './StrandComponentInput'

//ACTION
import * as StrandAction from "../../Actions/StrandAction";


export default class StrandComponentsDisplay extends React.Component {
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
			textAlign:"right",
			position:"relative", 
			fontFamily:"'Anaheim',serif",
			fontSize:"11px",
			width:"690px",
			top:"35px",
			color:"white"
		}
		const tableHeaderStyle = {
			 width:"713px",
			 height:"50px",
			 padding:"10px 10px 5px 40px",
			 color:"white",
			 background:"rgba(139, 179, 218,0.7)",
			 marginBottom:"1px",
			 fontSize:"16px"
		}

		const tableBodyStyle ={
			background:"rgba(100, 153, 206,0.5)",
			width:"713px",
			height:"557px"
		}
		//
		const selectRowProp = {
  			mode: "checkbox",
  			clickToSelect: true,
  			width:"15px",
  			bgColor: "rgb(238, 193, 213)",
		}
		return(
			<div style = {{height:"655px",marginLeft:"0px"}}>

				<div className= "animated fadeInUp" style = {{display:"inline-block"}}>
					<StrandComponentInput strandlist = {this.props.Component_list}/>
				</div>


				<div className= "animated fadeInUp" style = {{display:"inline-block",verticalAlign:"top",marginLeft:"5px"}}>
				
 					<div style = {tableHeaderStyle}>  
 						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">view_quilt</i>
						Strand Components Table
					</div>
  					
  					<div style = { tableBodyStyle}>
						<div style  = {conditionStyle}> Salt: {this.props.Salt}  ,  Concentration of Salt: {this.props.Concentration}</div> 
  						<BootstrapTable  
  							tableStyle = {{backgroundColor:"#f2f4f7",opacity:".95",height:"415px"}}	
  							data={this.props.Component_list}   
  							height="405px"
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
	    			    		width = "150px"> 
	    			    		Name
	    			    	</TableHeaderColumn>
	   			    		
	   			    		<TableHeaderColumn 
	   			    			dataSort={true} 
	   			    			dataField="blueprint"  
	   			    			width = "230px">
	   			    			Blueprint   
	   			    		</TableHeaderColumn>
	 				    	
	 				    	<TableHeaderColumn dataField="meltingpoint" width = "70px"> Melting Pt. </TableHeaderColumn>
	 				    	
	 				    	<TableHeaderColumn dataField="length"  width = "50px"> Length </TableHeaderColumn>

	 			    		<TableHeaderColumn dataField="mismatch" width = "63px"> Mismatch </TableHeaderColumn>
	 			    		
	 			    		<TableHeaderColumn 	dataField="self" width = "50px"> Self </TableHeaderColumn>
	 			    		
	 			    		<TableHeaderColumn dataField="complement"> Comp </TableHeaderColumn>
 						</BootstrapTable>
 					</div>
 				</div>
 			 </div>
		)
	}
}





