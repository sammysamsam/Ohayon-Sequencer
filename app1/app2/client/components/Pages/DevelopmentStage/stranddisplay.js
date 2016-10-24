import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Pagination from "pagination";
//STORE
import StrandlistStore from "../../Store/StrandlistStore";
//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Stranddisplay extends React.Component {
	constructor(){
		super()
		this.updatestrandlist = this.updatestrandlist.bind(this)
		this.state = {strandlist: StrandlistStore.getAllStrands()}
		this.temporaryStrandList = StrandlistStore.getAllStrands();
	};
	componentWillMount() {
			StrandlistStore.on("Change_Strandlist",this.updatestrandlist)
	}
	componentWillUnmount() {
			StrandlistStore.removeListener("Change_Strandlist",this.updatestrandlist)
	}

	updatestrandlist(){
		this.setState( {strandlist: StrandlistStore.getAllStrands() })
	}

	format(cell, row){
  		return '<i class="glyphicon glyphicon-usd"></i> ' + cell
	}

	updateStoreStrandlist(){

		StrandAction.UpdateStrandlist(this.temporaryStrandList);
	}

	render(){
		
		//  inline styles

		const displaytablestyle = {
			height:"400px",width:"660px",marginTop: "5px",opacity: "0.9",color:"black",paddingBottom:"30px", fontSize:"11px"
		}
		const displaycontainerstyle = {
			height:"515px",width:"700px",padding:"20px", backgroundColor:"#f2f2f2"
		}
		const displayheaderstyle = {
			backgroundColor:"#666666" , fontSize:"10px", color:"white"
		}
		const displaybodystyle = {
			backgroundColor:"white", marginTop:"-20px", color:"black"
		}

		//

		var selectRowProp = {
  			mode: "checkbox",
  			clickToSelect: true,
  			bgColor: "rgb(238, 193, 213)",
		}
		var editCellProp = {
  			mode: "dbclick",
  			blurToSave:true,
  			bgColor: "rgb(238, 193, 213)",
  			afterSaveCell: (row,cellName,cellValue) => {

  				//do later

  			}
		}



		//
		return(
  			<BootstrapTable  	data={this.temporaryStrandList}       bodyStyle = {displaybodystyle}    headerStyle = {displayheaderstyle}     tableStyle = {displaytablestyle}    containerStyle = {displaycontainerstyle} 
  					condensed = {true} pagination={true} striped={true} hover={true}  deleteRow={true}
  					cellEdit = {editCellProp}	selectRow={selectRowProp}	afterTableComplete= {this.updateStoreStrandlist.bind(this)} >

    			    <TableHeaderColumn dataField="name" isKey={true} dataSort={true} width = "109px"> Strand Name</TableHeaderColumn>
   			    	<TableHeaderColumn dataField="blueprint"         dataSort={true} width = "140px"> Blueprint   </TableHeaderColumn>
 				    <TableHeaderColumn dataField="length"            dataSort={true} width = "78px"> Length </TableHeaderColumn>
 			    	<TableHeaderColumn dataField="mismatch"          dataSort={true} width = "125px"> Mismatch Limit </TableHeaderColumn>
 			    	<TableHeaderColumn dataField="hairpin"           dataSort={true} width = "110px"> Hairpin Limit </TableHeaderColumn>
 			    	<TableHeaderColumn dataField="complement"        dataSort={true} width = "105px"> Complement </TableHeaderColumn>
 			 </BootstrapTable>

		)
	}
}





