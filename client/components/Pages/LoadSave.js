import React from "react";
import ReactDOM from 'react-dom';
import {Button,TextArea} from 'react-materialize';
import {Modal,ModalHeader,ModalFooter,ModalBody} from 'elemental';
//import FileReaderInput from 'react-file-reader-input';

//ACTION
import * as StrandAction from "../Actions/StrandAction";

//STORE
import ProjectStore from "../Store/ProjectStore";

export default class LoadSave extends React.Component {
	
	constructor(){
		super();
		this.updateInput = this.updateInput.bind(this);
		this.processInput = this.processInput.bind(this);
		this.toggleInputModal = this.toggleInputModal.bind(this);
		this.getCompressedDataResults = this.getCompressedDataResults.bind(this);
		this.toggleSaveModal = this.toggleSaveModal.bind(this);
		this.state = {  jsonData:"",
						inputModalStatus:false,
						saveModalStatus:false,
						input:""
					}
	}
/*
	componentWillMount() 
	{
		ProjectStore.on()
	}
	componentWillUnmount() 
	{
		ProjectStore.removeListener();
	}
*/

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
		try
		{
			let parsed = JSON.parse(this.state.input);
			StrandAction.OpenProjectJSONData(parsed);
			this.setState({inputModalStatus:false});

		}catch(e)
		{
			Materialize.toast("Unsuccessful!");
		}
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
         
	        <div className = {"hvr-underline-reveal"} style = {buttonStyle} onClick={this.toggleInputModal}>
				<i style = {{position:"relative",top:"7px",marginRight:"5px"}}className="material-icons">
					open_in_browser
				</i>
	        	Input Project
	        </div>
			
	        <div className = {"hvr-underline-reveal"} style = {buttonStyle} onClick={this.toggleSaveModal}>
				<i style = {{position:"relative",top:"8px",marginRight:"5px"}}className="material-icons">
					file_download
				</i>
	        	Save Project
	        </div>


			<Modal isOpen={this.state.inputModalStatus} onCancel={this.toggleInputModal} backdropClosesModal>
				<ModalHeader text="LOAD PREVIOUS PROJECT:" />
				
				<ModalBody>
					<label>Input Data From Previous Project:</label>
					<textarea   onChange = {this.updateInput} ref = "inputarea" id="textarea1" className="materialize-textarea"></textarea>
				</ModalBody>
				
				<ModalFooter>
					<Button style ={{marginRight:"10px"}} onClick={this.processInput}>
						Upload
					</Button>
					<Button onClick={this.toggleInputModal}>Close</Button>
				</ModalFooter>
			</Modal>



			
			<Modal isOpen={this.state.saveModalStatus} onCancel={this.toggleSaveModal} backdropClosesModal>
				<ModalHeader text="SAVE CURRENT PROJECT " />
				
				<ModalBody>
					<p style = {{fontFamily:"'Anaheim',serif",textAlign:"center"}}>Copy & Save Data Below:</p>
					<p style = {{wordWrap:"break-word",width:"580px"}} >{this.state.jsonData}</p>
				</ModalBody>

				<ModalFooter>
					<Button onClick={this.toggleSaveModal}>Close</Button>
				</ModalFooter>
			</Modal>


		</div>
		);
	}
}