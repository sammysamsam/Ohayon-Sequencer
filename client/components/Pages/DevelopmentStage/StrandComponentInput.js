import React from "react";
import { FormControl,Form,FormGroup,Button} from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'


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
						mismatchlimit: 5, 
						selflimit: 5, 
						blueprint: "o-o-o-o-o-o-o-o-o-o"
					};
	}

	handlename(input)
	{
		this.setState({name : input.target.value});
	}
	handlelength(input)
	{
		let strandlength = input.target.value;

		if (strandlength == parseInt(strandlength, 10))
		{
			this.setState({strandlength});			//set length
			var blueprint = "o";
			for (var i = 1; i < strandlength; i ++)
			{
				blueprint = blueprint + "-o";
			}
			this.setState({blueprint});			//set blueprint
		}

		if(strandlength == "")
		{
			this.setState({strandlength:10});
			this.setState({blueprint:"o-o-o-o-o-o-o-o-o-o"});
		}
	}
	handlemismatchlimit(input)
	{
		if (e.target.value == parseInt(input.target.value, 10))
		{
			this.setState({mismatchlimit:input.target.value});
		}
		if(e.target.value == "")
		{
			this.setState({mismatchlimit:5});
		}
	}
	handleselflimit(input)
	{
		if (e.target.value == parseInt(input.target.value, 10))
		{
			this.setState({selflimit:input.target.value});
		}		
		if(e.target.value == "")
		{
			this.setState({selflimit:5});
		}		
	}		
	handlemeltingpoint(input)
	{
		let meltingpoint = input.target.value.replace(" ","");
		if(meltingpoint== "")
		{
			this.setState({meltingpoint:"n/a"});
		}
		if ( ( (meltingpoint == parseInt(meltingpoint, 10)) && (parseInt(meltingpoint) > 0))  || (meltingpoint== "")  )
		{
			this.setState({meltingpoint});
		}		
	}		
	handleblueprint(input)
	{
		let blueprint = input.target.value;
		this.setState({blueprint});
	}
	handleComplement(input)
	{
			this.setState({ complement : input.target.value });
	}

	tokenprocessor()
	{
		if (!/\S/.test(this.state.name)) 
		{
			alert("Unfufilled Requirement: Name field must contain at least one character");
		}else if(this.state.name.includes("'") || this.state.name.includes("-"))
		{
			alert("NAME field contains restricted character: semicolon ( ' ) or dash ( - )");
		}else
		{
			let returnthis = {	name: this.state.name, 
								length: this.state.strandlength, 
								complement: this.state.complement, 
								mismatch: this.state.mismatchlimit, 
								self: this.state.selflimit, 
								blueprint: this.state.blueprint,
								meltingpoint:this.state.meltingpoint
							};
			StrandAction.Add_Component_StrandList(returnthis);		
		}

		//
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
		let bodyStyle = {
			width:"300px",
			background:"rgba(100, 153, 206,0.4)",
			padding:"10px",
			color:"white",
			marginTop:"-9px"
		}
		let headerStyle = {
			color:"white",
			fontFamily: "'Anaheim', serif ",
			background:"rgba(139, 179, 218,0.7)",
			width:"300px",
			height:"50px",
			padding:"15px 0px 0px 10px"
		}
		let labelStyle = {
			margin:"11px",
			fontFamily: "'Roboto', serif " ,
			height:"35px"
		}
		let input2Style = {
			fontFamily: "'Roboto', serif " , 
			height:"98px", 
			width:"280px", 
			resize:"none",
			color:"black",
			padding:"4px"
		}
					//		<h5 style = {labelStyle}> Melting Point:		<FormControl type = "text" placeholder = "Default: none" style = {{color:"black",fontSize:"16px",fontFamily: "'Anaheim', serif ",width:"95px" ,display:"inline"}}     onKeyPress={this._handleKeyPress.bind(this)} onChange = {this.handlemeltingpoint.bind(this)} /> </h5>

		return(			
		<div >				
			<h4 style = {headerStyle}> <Glyphicon glyph = "pencil"/> Strand Component Input </h4>

			<div style = {bodyStyle}>		
				<h5 style = {labelStyle}> 
					Name:	
					<FormControl 
						type = "text" 
						placeholder = "" 
						style = {{marginLeft:"5px",color:"black",fontSize:"16px",display:"inline",width:"200px" }}  
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handlename.bind(this)} 
					/>
				</h5>
				<h5 style = {labelStyle}> 	
					Length: 			
					<FormControl 
						type = "text" 
						placeholder = "Default (10)"  
						style = {{marginLeft:"5px",color:"black",fontSize:"16px",width:"195px" ,display:"inline"}}    
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handlelength.bind(this)} 
					/>
				</h5>

				<h5 style = {labelStyle}> 
					Mismatch Limit:		
					<FormControl type = "text" 
					placeholder = "Default (5)" 
					style = {{marginLeft:"5px",color:"black",fontSize:"16px",width:"138px" ,display:"inline" }}  
					onKeyPress={this._handleKeyPress.bind(this)} 
					onChange = {this.handlemismatchlimit.bind(this)} 
					/>
				</h5>		

				<h5 style = {labelStyle}> 
					Self-Mismatch Limit:		
					<FormControl 
						type = "text" 
						placeholder = "Default (5)" 
						style = {{marginLeft:"5px",color:"black",fontSize:"16px",width:"111px" ,display:"inline"}}     
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handleselflimit.bind(this)} 
					/> 
				</h5>

				<h5 style = {labelStyle}> Complement Exists:  
					<label style = {{marginLeft:"10px"}} >
						<input 					
							name="YesNo" 
							defaultChecked = {(this.state.complement== "true")}  
							value={"true"}  
							type="radio" 
							onClick = {this.handleComplement.bind(this)} 
							style = {{marginRight:"5px"}}
							/>
						 Yes 
					</label>
					<label style = {{marginLeft:"10px"}} >
						<input
							name="YesNo" 
							defaultChecked = {(this.state.complement == "false")} 
							value={"false"} 
							type="radio" 
							onClick = {this.handleComplement.bind(this)}
							style = {{marginRight:"5px"}}
						/> 
						 No 
					</label>

				</h5>

				<h5  style = {labelStyle}>  Blueprint: </h5>
				<textarea 
					value = {this.state.blueprint} 
					onKeyPress={this._handleKeyPress.bind(this)} 
					style = {input2Style} 
					onChange = {this.handleblueprint.bind(this)} 
				/>
				<br/>
				<Button 
					style = {{width:"75px" }}
					bsStyle="danger"
					bsSize="small"
					onClick = {this.tokenprocessor.bind(this)}> 
					Submit 
				</Button>
			</div>
		</div>
		);
	}
}