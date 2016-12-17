import React from "react";
import {Input,Button,Row} from 'react-materialize'

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class StrandComponentInput extends React.Component {

	constructor()
	{
		super();
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

	handlename(input)
	{
		this.setState({name : input.target.value});
	}
	handlelength(input)
	{
		let strandlength = input.target.value;
		//set max melting pt


		//

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
	handlemismatchlimit(input)
	{
		if(input.target.value == "")
		{
			this.setState({mismatchlimit:5});
		}else
		{
			this.setState({mismatchlimit:input.target.value});
		}
	}
	handleselflimit(input)
	{
		
		if(e.target.value == "")
		{
			this.setState({selflimit:5});
		}else
		{
			this.setState({selflimit:input.target.value});
		}
	}		
	handlemeltingpoint(input)
	{
		let meltingpoint = input.target.value.replace(" ","");
		if(meltingpoint== "")
		{
			this.setState({meltingpoint:"n/a"});
		}else
		{
			this.setState({meltingpoint});
		}		
	}		
	handleblueprint(input)
	{
		this.setState({blueprint:input.target.value});
	}
	handleComplement(input)
	{
		this.setState({ complement : input.target.value });
	}

	tokenprocessor()
	{
		let alerts = false;
		if(!this._isInt(this.state.strandlength)||
			!this._isInt(this.state.mismatchlimit)||
			!this._isInt(this.state.selflimit))
		{
			alerts = true;
		}

		//check name
		if (!/\S/.test(this.state.name)) 
		{
			Materialize.toast("Unfufilled Requirement: Name field must contain at least one character!",4000);
			alerts = true;
		}

		if(this.state.name.includes("'") || this.state.name.includes("-"))
		{
			Materialize.toast("Unfufilled Requirement: Name field contains restricted character: semicolon ( ' ) or dash ( - )!",4000);
			alerts = true;
		}

		// check blueprint
		if(this.state.strandlength != this.state.blueprint.split("-").length)
		{
			alerts = true;
			Materialize.toast("Unfufilled Requirement: Blueprint length does not match Strand Length!",4000);
		}

		//check repeat name
		for(let i = 0; i < this.props.strandlist.length;i++)
		{
			if(this.props.strandlist[i].name == this.state.name)
			{
				alerts = true;
				Materialize.toast("Unfufilled Requirement: Name already exists in Component List",4000);
				break;
			}
		}


		/*check melting point
		if(this.state.meltingpoint < 0 || this.state.meltingpoint > this.state.maxMeltingPt)
		{
			alerts = true;
			Materialize.toast("Unfufilled Requirement: Melting Pt exceeds maximum melting pt possible for given strand length",4000);	
		}*/



		if(alerts == false)
		{
			StrandAction.Add_Component_StrandList(
				{	name: this.state.name, 
					length: this.state.strandlength, 
					complement: this.state.complement, 
					mismatch: this.state.mismatchlimit, 
					self: this.state.selflimit, 
					blueprint: this.state.blueprint,
					meltingpoint:this.state.meltingpoint
				}
			);
		}
	}
	_handleKeyPress(input) 
	{
		if (input.key == 'Enter') 
		{
			this.tokenprocessor();
		}
	}
	_isInt(number)
	{
		return number % 1 == 0;
	}

	render()
	{
		let bodyStyle = {
			width:"300px",
			background:"rgba(100, 153, 206,0.4)",
			padding:"15px 15px 10px 15px ",
			marginTop:"1px"
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
					//		<p style = {labelStyle}> Melting Point:		<FormControl type = "text" placeholder = "Default: none" style = {{color:"black",fontSize:"16px",fontFamily: "'Anaheim', serif ",width:"95px" ,display:"inline"}}     onKeyPress={this._handleKeyPress.bind(this)} onChange = {this.handlemeltingpoint.bind(this)} /> </p>

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
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handlename.bind(this)} 
					/>
					<Input
						label = "Length"
						type = "number"
						min = "1"
						s = {6}
						className="validate"
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handlelength.bind(this)} 
					/>
					<Input
						label = "Melting Pt."
						type = "number"
						min = "1"
						max = {this.state.maxMeltingPt}
						s = {6}
						className="validate"
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handlemeltingpoint.bind(this)} 
					/>	
					<Input 
						label = "Mismatch Limit"
						className="validate"
						s = {6}
						type = "number"
						min = "2"
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handlemismatchlimit.bind(this)} 
					/>
					<Input 
						s = {6}
						label = "Self-Mismatch Limit"
						className="validate"
						type = "number"
						min = "2"
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handleselflimit.bind(this)} 
					/> 
					<p className = "col" style = {{color:"#9e9e9e",paddingLeft:"10px"}}> Complement Exists: 	</p>
					<Input 					
						name="YesNo" 		
						defaultChecked = {(this.state.complement== "true")}  
						value={"true"}  
						type="radio"
						label = "Yes"
						onClick = {this.handleComplement.bind(this)} 
					/>
					<Input
						name="YesNo" 
						label = "No"
						value={"false"} 
						type="radio" 
						onClick = {this.handleComplement.bind(this)}
					/> 
					</Row>
				<span className = "col" style = {{color:"#9e9e9e",paddingLeft:"10px",fontSize:"9px"}}> Blueprint (optional):	</span>

				<textarea 
					value = {this.state.blueprint} 
					onKeyPress={this._handleKeyPress.bind(this)} 
					style = {textAreaStyle} 
					onChange = {this.handleblueprint.bind(this)} 
				/>

				<Button 
					style = {{width:"150px" , marginTop:"5px"}}
					onClick = {this.tokenprocessor.bind(this)}> 
					Submit 
				</Button>
			</div>
		</div>
		);
	}
}