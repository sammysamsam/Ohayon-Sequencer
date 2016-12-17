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
			this.state.fiveprime = "true";
		else if(input.target.value == 2)
			this.state.fiveprime = "false";
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
	
	tokenprocessor()
	{
		let checkpoint = true;
		if(this.state.name == "" || this.state.components.length == 0){
			Materialize.toast("Unfufilled Requirement: Name or Components field can not be blank!",4000);
			checkpoint = false;
		}
		for(let i = 0; i < this.props.fulllist.length; i++)
		{
			if(this.props.fulllist[i].name == this.state.name)
			{
				checkpoint = false;
				Materialize.toast("Unfufilled Requirement: Name already exists!",4000);	
				break;
			}
		}
		if(checkpoint)
		{
			let name = this.state.name;
			let componentList = this.state.components;
			let componentsDisplay = "";
			if(this.state.fiveprime == "loop")			//loop strand
				componentsDisplay = "(loop) ";

			if(this.state.fiveprime == "false")			// turn 3-5 to 5-3 
				componentList = componentList.reverse();

			componentsDisplay = componentsDisplay + componentList[0];			//process components list for displaying on table (string instead of array)
			for (let i = 1; i < componentList.length;i++)
			{
				componentsDisplay = componentsDisplay + " - "+componentList[i];
			}
			if(this.state.fiveprime == "false") // return components back to original order
				componentList = componentList.reverse();

			let loopcheck = "false";			//loop strand checkpoint
			if(this.state.fiveprime == 'loop')
				loopcheck = "true";

			let fullstrand = {	name: name,
								components:componentList,
								componentsDisplay:componentsDisplay, 
								loop:loopcheck
							}
			StrandAction.Add_Full_StrandList(fullstrand);
		}
	}
	



	rendercomponents(){
		let componentStyle = {
			width:"480px",
			textAlign:"center", 
			display:"block",
			margin:"auto",
			padding:"10px 10px 35px 10px",
			background:"rgba(0,0,0,.2)",
			marginBottom:"30px",
			overflowY:"auto",
			height:"120px",
			overflowWrap:"break-word"
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
			return (<p style = {componentStyle}> {comp} </p>)
		}
	}

	_handleKeyPress(input) 
	{
		if (input.key == 'Enter') 
			this.tokenprocessor();
	}

	render()
	{		 

		const headerStyle = {
			width:"530px",
			height:"50px",
			padding:"10px 10px 5px 40px",
			color:"white",
			background:"rgba(139, 179, 218,0.7)",
			fontSize:"16px",
			margin:"1px"
		}
		const bodyStyle = { 
			width:"530px",
			margin:"0px 0px 15px 1px",
			background:"rgba(100, 153, 206,0.5)",
			color:"white",
			padding:"12px"
		}
		return(		 

			<div>				
				<div style = {headerStyle}>	
					<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">input</i>
					Full Strand Input 
				</div>

				<div style = {bodyStyle}>
					<Row>		
						<Input 
							label = "Full Strand Name"
							s = {12}
							onKeyPress={this._handleKeyPress.bind(this)} 
							onChange = {this.handlename.bind(this)} 
						/>

						<p className = "col s12" style = {{color:"#9e9e9e",paddingLeft:"10px"}}> Select Direction: 	</p>
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
					</Row>
					
					<p className = "col s12" style = {{color:"#9e9e9e",paddingLeft:"10px"}}> 
						Components: 	
					</p>


					{this.rendercomponents()}

					<Select	placeholder="Add Strand Components" 
							name="form-field-name" 
							options={this.mutablelistprocessor()}	
							onChange = {this.handlecomponents.bind(this)} 
					/>

					<Button style = {{margin:"30px 0px 10px 10px",fontSize:"12px"}} onClick = {this.pop}> 
						Delete Recent Component
					</Button>
					<Button style = {{margin:"30px 0px 10px 5px",fontSize:"12px"}} onClick = {this.clear}> 
						Clear All Components
					</Button>
					<Button 
						style = {{margin:"3px 0px 10px 10px",fontSize:"13px"}} 
						onClick = {this.tokenprocessor.bind(this)}> 
						Submit 
					</Button>
				</div>
			</div>
		);
	}
}