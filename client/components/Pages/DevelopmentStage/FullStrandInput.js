import React from "react";
import {Row,Input,Button} from 'react-materialize';
import Select from 'react-select'

//ACTION
import * as StrandAction from "../../Actions/StrandAction";
export default class StrandComponentInput extends React.Component {

	constructor()
	{
		super();
		this.pop = this.pop.bind(this);
		this.clear = this.clear.bind(this);
		this.state = { 
			name: "", 
			components:[],
			fiveprime:"5' to 3'"
		};
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
			this.state.fiveprime = "5' to 3'";
		else if(input.target.value == 2)
			this.state.fiveprime = "3' to 5'";
		else if(input.target.value == 3)
			this.state.fiveprime = "loop";
	}
	mutablelistprocessor()
	{
		let strandlist = [];
		for(let i = 0; i < this.props.complist.length;i ++)
		{
			let f = this.props.complist[i].name;
			strandlist.push({value:this.props.complist[i].name ,label:f});
			if(this.props.complist[i].complement == "true")
				strandlist.push({value:this.props.complist[i].name +"'" ,label:f+"'"});
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
	
	//
	validatename()
	{
		if(this.state.name == "" || this.state.components.length == 0){
			Materialize.toast("Unfufilled Requirement: Name or Components field can not be blank!",4000);
			return false;
		}
		if(this.state.name.length > 35){
			Materialize.toast("Unfufilled Requirement: Name must contain 1 - 25 characters",4000);
			return false;
		}
		return true;
	}
	validatecomponents()
	{
		for(let i = 0; i < this.props.fulllist.length; i++)
		{
			if(this.props.fulllist[i].name.replace(/ /g,"")  == this.state.name.replace(/ /g,"") )
			{
				Materialize.toast("Unfufilled Requirement: Name already exists!",4000);	
				return false;
			}
		}
		return true;
	}

	//
	tokenprocessor()
	{
		if(!this.validatename() || !this.validatecomponents())
			return;

		let name = this.state.name;
		let componentsDisplay = "";

		//process components list for displaying on table (string instead of array)		
		for (let x = 0; x < this.state.components.length;x++)
		{
			let currentCompName = this.state.components[x];
			if(x != 0)
				componentsDisplay = componentsDisplay + " - ";
			componentsDisplay = componentsDisplay + currentCompName;

		}

		let fullstrand = {	name: name,
							components:this.state.components,
							componentsDisplay:componentsDisplay,
							fiveprime:this.state.fiveprime
						}
		this.clear();
		Materialize.toast("Successfully Added",2000);
		StrandAction.Add_Full_StrandList(fullstrand);
	}

	renderButton()
	{
		if(!this.props.status)
			return(
				<div >
					<Button style = {{margin:"15px 0px 5px 15px",fontSize:"12px"}} onClick = {this.pop}> 
						Delete Recent Component
					</Button>
					<Button style = {{margin:"15px 0px 5px 5px",fontSize:"12px"}} onClick = {this.clear}> 
						Clear All
					</Button>
					<Button style = {{margin:"15px 0px 5px 20px",fontSize:"13px"}} 
						onClick = {this.tokenprocessor.bind(this)}> 
						Submit 
					</Button>
				</div>
			);

		else
			return(
		<div >
			<Button style = {{margin:"15px 0px 5px 15px",fontSize:"12px"}} disabled> 
				Delete Recent Component
			</Button>
			<Button style = {{margin:"15px 0px 5px 10px",fontSize:"12px"}} disabled > 
				Clear All
			</Button>
			<Button 
				style = {{margin:"15px 0px 5px 10px",fontSize:"13px"}} 
				disabled
				>
				Submit 
			</Button>
		</div>
			);
	}

	rendercomponents(){
		let componentStyle = {
			width:"940px",
			textAlign:"center", 
			display:"block",
			padding:"10px 10px 35px 10px",
			background:"rgba(0,0,0,.2)",
			margin:"8px 15px 10px 15px",
			overflowY:"auto",
			height:"200px",
			overflowWrap:"break-word",
			fontSize:"17px"
		}
		if (this.state.components.length == 0)
			return (<div style = {componentStyle}> n/a </div>)				
		else 
		{
			var comp = this.state.components[0];

			for (let i = 1; i < this.state.components.length;i++)
			{
				comp = comp + " - "+this.state.components[i]
			}
			return (<div style = {componentStyle}> {comp} </div>)
		}
	}

	_handleKeyPress(input) 
	{
		if (input.key == 'Enter' && !this.props.status) 
			this.tokenprocessor();
	}

	render()
	{		 

		const headerStyle = {
			width:"1015px",
			height:"50px",
			padding:"10px 10px 5px 40px",
			color:"white",
			 background:"rgba(139, 179, 218,0.5)",
			fontSize:"16px",
			margin:"1px"
		}
		const bodyStyle = { 
			width:"1015px",
			height:"450px",
			margin:"0px 0px 15px 1px",
			background:"rgba(100, 153, 206,0.25)",
			color:"white",
			padding:"12px 12px 0px 12px"
		}
		return(		 

			<div style = {{marginTop:"15px"}}>				
				<div style = {headerStyle}>	
					<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">input</i>
					Full Strand Input 
				</div>

				<div style = {bodyStyle}>
						<Row>
							<Input 
								label = "Full Strand Name"
								style = {{width:"600px"}}
								onKeyPress={this._handleKeyPress.bind(this)} 
								onChange = {this.handlename.bind(this)} 
							/>
							<div style = {{paddingTop:"30px"}}>
							<Input 
								name="dnadirection3" 
								value = {1} 
								label = "5 '- 3'"
								defaultChecked = {true} 
								type="radio"  
								onClick = {this.handleprime.bind(this)} 
							/>   
							<Input 
								name="dnadirection3" 
								value = {2} 
								label = "3' - 5'" 
								type="radio"  
								onClick = {this.handleprime.bind(this)} 
								/>   
							<Input 
								name="dnadirection3" 
								value = {3} 
								label = "Loop DNA" 
								type="radio"  
								onClick = {this.handleprime.bind(this)} 
							/>  
							</div>
						</Row> 
					
					<div style = {{padding:" 0px 40px 10px 20px",marginTop:"-10px"}}>
						<Select	placeholder="Add Strand Components" 
								name="form-field-name" 
								options={this.mutablelistprocessor()}	
								onChange = {this.handlecomponents.bind(this)} 
						/>		
					</div>			

					{this.rendercomponents()}
					{this.renderButton()}

				</div>
			</div>
		);
	}
}