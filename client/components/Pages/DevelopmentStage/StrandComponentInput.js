import React from "react";
import {Input,Button,Row} from 'react-materialize'

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class StrandComponentInput extends React.Component {

	constructor()
	{
		super();
		this.handleName = this.handleName.bind(this);
		this.handleLength = this.handleLength.bind(this);
		this.handleMeltingPoint = this.handleMeltingPoint.bind(this);
		this.tokenprocessor = this.tokenprocessor.bind(this);
		this.handleMismatchLimit = this.handleMismatchLimit.bind(this);
		this.handleSelfLimit = this.handleSelfLimit.bind(this);
		this.handleBlueprint = this.handleBlueprint.bind(this);
		this.handleComplement = this.handleComplement.bind(this);
		this._handleKeyPress = this._handleKeyPress.bind(this);
		this.state = {	name: "", 
						strandlength: 10, 
						complement: "true",
						meltingpoint:"n/a",
						maxMeltingPt:"100",
						mismatchlimit: 5, 
						selflimit: 5, 
						blueprint: "o-o-o-o-o-o-o-o-o-o",
					};
	}

	//


	handleName(input)
	{
		this.setState({name : input.target.value});
	}

	handleLength(input) // input will always be a number
	{
		let strandlength = input.target.value;
		//set max melting pt

		if(strandlength == "")
		{
			this.setState({strandlength:10});
			this.setState({blueprint:"o-o-o-o-o-o-o-o-o-o"});
		}
		else
		{
			this.setState({strandlength});			//set length
			var blueprint = "o";
			for (var i = 1; i < strandlength; i ++)
			{
				blueprint = blueprint + "-o";
			}
			this.setState({blueprint});			//set blueprint	
		}
	}

	handleMismatchLimit(input)
	{
		if(input.target.value == "")
			this.setState({mismatchlimit:5});
		else
			this.setState({mismatchlimit:input.target.value});
	}
	handleSelfLimit(input)
	{
		
		if(input.target.value == "")
			this.setState({selflimit:5});
		else
			this.setState({selflimit:input.target.value});
	}		
	handleMeltingPoint(input)
	{
		if(input.target.value== "")
			this.setState({meltingpoint:"n/a"});
		//else
		//	this.setState({meltingpoint:input.target.value});	
	}		
	handleBlueprint(input)
	{
		this.setState({blueprint:input.target.value});
	}
	handleComplement(input) // true or false
	{
		this.setState({ complement : input.target.value });
	}
//

	validateblueprint()
	{
		// check blueprint (remove all - and spaces)
		let blueprintTemp = ""
		let bases = this.state.blueprint.toUpperCase().split("");
		for(let x = 0; x<bases.length; x++)
		{
			if( (bases[x] == "O") )
				blueprintTemp = blueprintTemp + 'o';
			if((bases[x] == "A") || 
				(bases[x] == "T") || 	
				(bases[x] == "C") || 
				(bases[x] == "G"))
				blueprintTemp = blueprintTemp + bases[x];
		}
		if(this.state.strandlength != blueprintTemp.length)
		{
			Materialize.toast("Unfufilled Requirement: Blueprint contains invalid character or length does not match Strand Length!",4000);
			return "invalid"
		}
		return blueprintTemp;
	}
	validatename()
	{
		//check name contains requirements
		if( this.state.name.length > 30 || !/\S/.test(this.state.name) || this.state.name.includes("'") || this.state.name.includes("-"))
		{
			Materialize.toast("Unfufilled Requirement: Name field must contain 1-30 characters and not include restricted character: semicolon ( ' ) or dash ( - )!",4000);
			return false;
		}
		//check repeat name
		for(let i = 0; i < this.props.strandlist.length;i++)
		{
			if(this.props.strandlist[i].name.replace(/ /g,"") == this.state.name.replace(/ /g,""))
			{
				Materialize.toast("Unfufilled Requirement: Name already exists in Component List",4000);
				return false;
			}
		}	
		return true;
	}
//

	tokenprocessor()
	{
//check if length,mismatch,self are whole numbers
		if(!this._isInt(this.state.strandlength)||
			!this._isInt(this.state.mismatchlimit)||
			!this._isInt(this.state.selflimit))
			return;

		let processBlueprint = this.validateblueprint();

		if(!this.validatename() || processBlueprint == "invalid")
			return;

		/*check melting point
		if(this.state.meltingpoint < 0 || this.state.meltingpoint > this.state.maxMeltingPt)
		{
			alerts = true;
			Materialize.toast("Unfufilled Requirement: Melting Pt exceeds maximum melting pt possible for given strand length",4000);	
		}*/


		StrandAction.Add_Component_StrandList(
			{	name: this.state.name, 
				length: this.state.strandlength, 
				complement: this.state.complement, 
				mismatch: this.state.mismatchlimit, 
				self: this.state.selflimit, 
				blueprint: processBlueprint,
				meltingpoint:this.state.meltingpoint
			}
		);
	}
//
	_handleKeyPress(input) 
	{
		if (input.key == 'Enter' && !this.props.status) 
			this.tokenprocessor();
	}
	_isInt(number)
	{
		return number % 1 == 0;
	}
//

	renderButton()
	{
		if(!this.props.status)
			return(
				<Button 
					style = {{width:"150px" , marginTop:"5px"}}
					onClick = {this.tokenprocessor}> 
					Submit 
				</Button>
			);
		else
			return(	
				<Button 
					style = {{width:"150px" , marginTop:"5px"}}
					disabled
					onClick = {this.tokenprocessor}> 
					Submit 
				</Button>
				);
	}
	render()
	{
		let bodyStyle = {
			width:"300px",
			background:"rgba(100, 153, 206,0.4)",
			padding:"10px 15px 10px 15px ",
			marginTop:"1px",
			height:"557px"
		}
		let headerStyle = {
			background:"rgba(139, 179, 218,0.7)",
			width:"300px",
			height:"50px",
			padding:"9px 0px 0px 20px",
			fontSize:"16px"
		}
		let textAreaStyle = {
			height:"150px", 
			width:"270px",
			background:"rgba(0,0,0,.2)",
			resize:"none",
			padding:"4px",
			overflow:"scroll"
		}
					//		<p style = {labelStyle}> Melting Point:		<FormControl type = "text" placeholder = "Default: none" style = {{color:"black",fontSize:"16px",fontFamily: "'Anaheim', serif ",width:"95px" ,display:"inline"}}     onKeyPress={this._handleKeyPress} onChange = {this.handleMeltingPoint} /> </p>

		return(			
		<div style = {{color:"white"}}>				
			<div style = {headerStyle}> 
				<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">input</i>	
				Strand Component Input
			</div>
			<div style = {bodyStyle}>
				<Row>		
					<Input 
						label = "Name"
						s = {12}
						type = "text"
						className="validate"
						onKeyPress={this._handleKeyPress} 
						onChange = {this.handleName} 
					/>
					<Input
						label = "Length"
						type = "number"
						min = "1"
						s = {6}
						className="validate"
						onKeyPress={this._handleKeyPress} 
						onChange = {this.handleLength} 
					/>
					<Input
						label = "Melting Pt."
						type = "number"
						min = "1"
						max = {this.state.maxMeltingPt}
						s = {6}
						className="validate"
						onKeyPress={this._handleKeyPress} 
						onChange = {this.handleMeltingPoint} 
					/>	
					<Input 
						label = "Mismatch Limit"
						className="validate"
						s = {6}
						type = "number"
						min = "2"
						onKeyPress={this._handleKeyPress} 
						onChange = {this.handleMismatchLimit} 
					/>
					<Input 
						s = {6}
						label = "Self-Mismatch Limit"
						className="validate"
						type = "number"
						min = "2"
						onKeyPress={this._handleKeyPress} 
						onChange = {this.handleSelfLimit} 
					/> 
					<p className = "col" style = {{color:"#9e9e9e",paddingLeft:"10px"}}> Complement Exists: 	</p>
					<Input 					
						name="YesNo" 		
						defaultChecked = {(this.state.complement== "true")}  
						value={"true"}  
						type="radio"
						label = "Yes"
						onClick = {this.handleComplement} 
					/>
					<Input
						name="YesNo" 
						label = "No"
						value={"false"} 
						type="radio" 
						onClick = {this.handleComplement}
					/> 
					</Row>
				<span className = "col" style = {{color:"#9e9e9e",paddingLeft:"10px",fontSize:"9px"}}> 
					Blueprint i.e. ATCGo ( "-" is optional):	
				</span>

				<textarea 
					value = {this.state.blueprint} 
					onKeyPress={this._handleKeyPress} 
					style = {textAreaStyle} 
					onChange = {this.handleBlueprint} 
				/>
				{this.renderButton()}

			</div>
		</div>
		);
	}
}