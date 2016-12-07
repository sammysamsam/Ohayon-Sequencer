import React from "react";
import { FormControl,Button, Checkbox } from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Select from 'react-select'

import 'react-select/dist/react-select.css';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";
export default class StrandComponentInput extends React.Component {

	constructor()
	{
		super();
		
		this.state = { 
			name: "", 
			components:[],
			fiveprime:"true"};
	}

	handlename(input)
	{
		this.setState({name : input.target.value});
	}
	handlecomponents(input)
	{
		let temp = this.state.components;
		temp.push(input.label);
		this.setState({components:temp});
	}
	handleprime(input)
	{
		if(input.target.value == 1)
		{
			this.state.fiveprime = "true";
		}else if(input.target.value == 2)
		{
			this.state.fiveprime = "false";
		}else if(input.target.value == 3)
		{
			this.state.fiveprime = "loop";
		}
	}
	mutablelistprocessor()
	{
		let strandlist = [];
		for(let i = 0; i < this.props.strandlist.length;i ++)
		{
			let f = this.props.strandlist[i].name;
			strandlist.push({value:this.props.strandlist[i].name ,label:f});
			if(this.props.strandlist[i].complement == "true")
				strandlist.push({value:this.props.strandlist[i].name +"'" ,label:f+"'"});
		}
		return strandlist;
	}

	clear()
	{
		this.setState({components:[]});
	}

	pop()
	{
		let newcomponents = this.state.components;
		newcomponents.pop();
		this.setState({components:newcomponents});
	}
	
	tokenprocessor()
	{

		if(this.state.name == "" || this.state.components.length == 0){
			alert("Unfufilled Requirement: Name or Components field can not be blank");
		}else{

			//full strand components
			let componentList = this.state.components;
			let componentsDisplay = "";

			//loop strand
			if(this.state.fiveprime == "loop")
			{
				componentsDisplay = "(loop) ";
			}	
			// turn 3-5 to 5-3 
			if(this.state.fiveprime == "false")
			{
				componentList = componentList.reverse();
			}
			
			//process components list for displaying on table (string instead of array)
			componentsDisplay = componentsDisplay + componentList[0];
			for (let i = 1; i < componentList.length;i++)
			{
				componentsDisplay = componentsDisplay + " - "+componentList[i];
			}
			// return components back to original order
			if(this.state.fiveprime == "false")
			{
				componentList = componentList.reverse();
			}

			//loop strand checkpoint
			let loopcheck = "false";
			if(this.state.fiveprime == 'loop')
			{
				loopcheck = "true";
			}
			let fullstrand = {	name: this.state.name ,
								components:componentList, 
								componentsDisplay:componentsDisplay, 
								loop:loopcheck
							}
			
			StrandAction.Add_Full_StrandList(fullstrand);
		}
	}
	



	rendercomponents(){
		let componentStyle = {
			fontFamily: "'Raleway', serif " , 
			opacity:".95",
			width:"480px",
			textAlign:"center", 
			display:"block",
			margin:"auto",
			padding:"10px 10px 35px 10px",
			backgroundColor:"white",
			color:"black",
			marginBottom:"30px",
			overflowY:"auto",
			height:"120px",
			overflowWrap:"break-word"
		}
		if (this.state.components.length == 0)
		{
			return (<div style = {componentStyle}> n/a </div>)				
		} else 
		{
			var comp = this.state.components[0];

			for (let i = 1; i < this.state.components.length;i++)
			{
				comp = comp + " - "+this.state.components[i]
			}
			return (<h4 style = {componentStyle}> {comp} </h4>)
		}
	}

	_handleKeyPress(input) 
	{
		if (input.key == 'Enter') 
		{
			this.tokenprocessor();
		}
	}

	render()
	{		 

		const headerStyle = {
			width:"530px",
			height:"50px",
			padding:"15px 10px 5px 40px",
			color:"white",
			fontFamily: "'Anaheim', serif ",
			background:"rgba(139, 179, 218,0.7)",
			margin:"1px"
		}
		const bodyStyle = { 
			fontFamily: "'Roboto', serif " ,
			width:"530px",
			margin:"0px 0px 15px 1px",
			background:"rgba(100, 153, 206,0.5)",
			color:"white",
			padding:"15px"
		}
		return(		 

			<div>				
				<h4 style = {headerStyle}>	<Glyphicon glyph = "pencil"/> Full Strand Input </h4>

				<div style = {bodyStyle}>
				
					<h5 style = {{	fontFamily: "'Dosis', serif " ,  height:"35px"}}>	
						Strand Name: 
						 <FormControl 
						 	type = "text" 
						 	style = {{marginLeft:"10px",color:"black",fontSize:"18px",width:"350px",display:"inline"}} 
						 	onKeyPress={this._handleKeyPress.bind(this)}  
						 	onChange = {this.handlename.bind(this)}
						 />
					 </h5>
										
					<div style = {{height:"44px", padding:"10px 0px 0px 0px"}}>
						<span>Select Direction: </span>
						<label style = {{marginLeft:"10px"}} > 
							<input 
								name="dnadirection3" 
								value = {1} 
								defaultChecked = {true} 
								type="radio"  
								onClick = {this.handleprime.bind(this)} 
								style = {{marginRight:"15px"}}
							/>   
							5' - 3'
						</label>
						<label style = {{marginLeft:"10px"}} > 
							<input 
								name="dnadirection3" 
								value = {2} 
								defaultChecked = {false}  
								type="radio"  
								onClick = {this.handleprime.bind(this)} 
								style = {{marginRight:"15px"}} 
								/>   
							3' - 5' 
						</label>
						<label style = {{marginLeft:"10px"}} > 
							<input 
								name="dnadirection3" 
								value = {3} 
								defaultChecked = {false}  
								type="radio"  
								onClick = {this.handleprime.bind(this)} 
								style = {{marginRight:"15px"}} 
							/>   
							Loop DNA 
						</label>
					</div>
					
					<h5 style = {{  height:"15px"}}> Components: </h5>

					{this.rendercomponents()}

					<Select	placeholder="Add Strand Components" name="form-field-name" options={this.mutablelistprocessor()}	onChange = {this.handlecomponents.bind(this)} />

					<Button style = {{width:"170px",margin:"30px 0px 10px 10px",fontSize:"13px"}} 
						bsStyle="danger" 
						bsSize="small" 
						onClick = {this.pop.bind(this)}> 

						Delete Recent Component
					</Button>
					<Button style = {{width:"170px",margin:"30px 0px 10px 10px",fontSize:"13px"}} 
						bsStyle="danger" 
						bsSize="small" 
						onClick = {this.clear.bind(this)}> 

						Clear All Components
					</Button>
					<br/>
					
					<Button 
						style = {{width:"75px",margin:"0px 0px 10px 10px",fontSize:"13px"}} 
						bsStyle="primary" 
						bsSize="small" 
						onClick = {this.tokenprocessor.bind(this)}> 
						Submit 
					</Button>
				</div>
			</div>
		);
	}
}