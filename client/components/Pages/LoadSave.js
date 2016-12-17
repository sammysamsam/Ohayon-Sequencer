import React from "react";
import ReactDOM from 'react-dom';
import {Button,TextArea} from 'react-materialize';
import {Modal,ModalHeader,ModalFooter,ModalBody} from 'elemental';

//ACTION
import * as StrandAction from "../Actions/StrandAction";

//STORE
import ProjectStore from "../Store/ProjectStore";

export default class LoadSave extends React.Component {
	
	constructor(){
		super();
		this.updateInput = this.updateInput.bind(this);
		this.state = {  jsonData:"",
						inputModalStatus:false,
						saveModalStatus:false,
						input:""
					}
	}
	componentWillMount() 
	{
		ProjectStore.on("", this.getCompressedDataResults);
	}
	componentWillUnmount() 
	{
		ProjectStore.removeListener("Get_Data_OUTPUT",this.getCompressedDataResults);
	}

	//output

	getCompressedDataResults()
	{
		this.setState({ jsonData:ProjectStore.getJSONProjectData() });
	}

	// input

	updateInput(input)
	{
		this.setState({input:input.target.value});		
	}
	processInput()
	{
		
	}

	//
	toggleInputModal()
	{
		let status = !this.state.inputModalStatus;
		if(!status)
			ReactDOM.findDOMNode(this.refs.inputarea).value = "";
		this.setState({inputModalStatus:status});
	}
	toggleSaveModal()
	{
		let status = !this.state.saveModalStatus;
		this.setState({saveModalStatus:status});
		this.getCompressedDataResults();
	}

//

	_handleKeyPress(input) 
	{
		if (input.key == 'Enter') 
			this.processInput();
	}


	render(){

		let buttonStyle = {
			display:"inline-block",
			height:"35px",
			width:"100px",
			color:"#ff6600",
			marginRight:"5px",
			cursor:"pointer",
			fontSize:"11px"
		}
		return(
		<div style = {{float:"right",marginRight:"20px"}}>
         
	        <div className = {"hvr-underline-reveal"} style = {buttonStyle} onClick={this.toggleInputModal.bind(this)}>
				<i style = {{position:"relative",top:"7px",marginRight:"5px"}}className="material-icons">
					open_in_browser
				</i>
	        	Input Project
	        </div>
			
	        <div className = {"hvr-underline-reveal"} style = {buttonStyle} onClick={this.toggleSaveModal.bind(this)}>
				<i style = {{position:"relative",top:"8px",marginRight:"5px"}}className="material-icons">
					file_download
				</i>
	        	Save Project
	        </div>


			<Modal isOpen={this.state.inputModalStatus} onCancel={this.toggleInputModal.bind(this)} backdropClosesModal>
				<ModalHeader text="LOAD PREVIOUS PROJECT:" />
				
				<ModalBody>
					<label for="textarea1">Input Data From Previous Project:</label>
					<textarea ref = "inputarea" onKeyPress = {this._handleKeyPress.bind(this)} id="textarea1" className="materialize-textarea"></textarea>
				</ModalBody>
				
				<ModalFooter>
					<Button style ={{marginRight:"10px"}}onClick={this.processInput.bind(this)}>
						Upload
					</Button>
					<Button onClick={this.toggleInputModal.bind(this)}>Close</Button>
				</ModalFooter>
			</Modal>



			
			<Modal isOpen={this.state.saveModalStatus} onCancel={this.toggleSaveModal.bind(this)} backdropClosesModal>
				<ModalHeader text="SAVE CURRENT PROJECT " />
				
				<ModalBody>
					<p style = {{fontFamily:"'Anaheim',serif",textAlign:"center"}}>Copy & Save Data Below:</p>
					<p>{this.state.jsonData}</p>
				</ModalBody>

				<ModalFooter>
					<Button onClick={this.toggleSaveModal.bind(this)}>Close</Button>
				</ModalFooter>
			</Modal>


		</div>
		);
	}
}