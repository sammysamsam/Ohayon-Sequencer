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

	handlename(e)
	{
		this.setState({name : e.target.value});
	}
	handlelength(e)
	{
		let strandlength = e.target.value;

		//if length is integer
		if (strandlength == parseInt(strandlength, 10))
		{
			//set length
			this.setState({strandlength});
			var tempblueprint = "o";
			for (var i = 1; i < strandlength; i ++)
			{
				tempblueprint = tempblueprint + "-o";
			}

			//set blueprint
			this.setState({blueprint:tempblueprint});
		}

		if(strandlength == "")
		{
			this.setState({strandlength:10});
			this.setState({blueprint:"o-o-o-o-o-o-o-o-o-o"});
		}
	}
	handlemismatchlimit(e)
	{
		if (e.target.value == parseInt(e.target.value, 10))
		{
			this.setState({mismatchlimit:e.target.value});
		}
		if(e.target.value == "")
		{
			this.setState({mismatchlimit:5});
		}
	}
	handleselflimit(e)
	{
		if (e.target.value == parseInt(e.target.value, 10))
		{
			this.setState({selflimit:e.target.value});
		}		
		if(e.target.value == "")
		{
			this.setState({selflimit:5});
		}		
	}		
	handlemeltingpoint(e)
	{
		let value = e.target.value.replace(" ","");
		if(value == "")
		{
			this.setState({meltingpoint:"n/a"});
		}
		if ( ( (e.target.value == parseInt(e.target.value, 10)) && (parseInt(e.target.value) > 0))  || (e.target.value == "")  )
		{
			this.setState({meltingpoint:e.target.value});
		}		
	}		
	handleblueprint(e)
	{
		let blueprint = e.target.value;
		this.setState({blueprint});
	}
	handleComplement(v)
	{
			this.setState({ complement : v.target.value });
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
			var returnthis = {name: this.state.name, length: this.state.strandlength, complement: this.state.complement, mismatch: this.state.mismatchlimit, self: this.state.selflimit, blueprint: this.state.blueprint,meltingpoint:this.state.meltingpoint};
			StrandAction.Add_Component_StrandList(returnthis);		
		}

		//
	}
	_handleKeyPress(e) 
	{
		if (e.key == 'Enter') 
		{
			this.tokenprocessor();
		}
	}

	render()
	{
		let containerstyle = {
			width:"300px",
			background:"rgba(31, 64, 96,0.9)",
			padding:"10px",
			color:"white",
			marginTop:"-9px"
		}
		let titlestyle = {
			color:"white",
			fontFamily: "'Anaheim', serif ",
			background:"rgba(57, 115, 172,0.7)",
			width:"300px",
			height:"50px",
			padding:"15px 0px 0px 10px"
		}
		let labelstyle = {
			margin:"11px",
			fontFamily: "'Anaheim', serif " ,
			height:"35px"
		}
		let input2style = {
			fontFamily: "'Dosis', serif " , 
			height:"98px", 
			width:"280px", 
			resize:"none",
			color:"black",
		}
					//		<h4 style = {labelstyle}> Melting Point:		<FormControl type = "text" placeholder = "Default: none" style = {{color:"black",fontSize:"16px",fontFamily: "'Anaheim', serif ",width:"95px" ,display:"inline"}}     onKeyPress={this._handleKeyPress.bind(this)} onChange = {this.handlemeltingpoint.bind(this)} /> </h4>

		return(			
		<div>				
			<h4 style = {titlestyle}> <Glyphicon glyph = "pencil"/> Strand Component Input </h4>

			<div style = {containerstyle}>		
				<h4 style = {labelstyle}> 
					Name:	
					<FormControl 
						type = "text" 
						placeholder = "" 
						style = {{marginLeft:"5px",color:"black",fontSize:"16px",fontFamily: "'Anaheim', serif ",display:"inline",width:"200px" }}  
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handlename.bind(this)} 
					/>
				</h4>
				<h4 style = {labelstyle}> 	
					Length: 			
					<FormControl 
						type = "text" 
						placeholder = "Default (10)"  
						style = {{marginLeft:"5px",color:"black",fontSize:"16px",fontFamily: "'Anaheim', serif ",width:"190px" ,display:"inline"}}    
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handlelength.bind(this)} 
					/>
				</h4>

				<h4 style = {labelstyle}> 
					Mismatch Limit:		
					<FormControl type = "text" 
					placeholder = "Default (5)" 
					style = {{marginLeft:"5px",color:"black",fontSize:"16px",fontFamily: "'Anaheim', serif ",width:"125px" ,display:"inline" }}  
					onKeyPress={this._handleKeyPress.bind(this)} 
					onChange = {this.handlemismatchlimit.bind(this)} 
					/>
				</h4>		

				<h4 style = {labelstyle}> 
					Self-Mismatch Limit:		
					<FormControl 
						type = "text" 
						placeholder = "Default (5)" 
						style = {{marginLeft:"5px",color:"black",fontSize:"16px",fontFamily: "'Anaheim', serif ",width:"95px" ,display:"inline"}}     
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.handleselflimit.bind(this)} 
					/> 
				</h4>

				<h4 style = {labelstyle}> Complement Exists:  
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

				</h4>

				<h4  style = {labelstyle}>  Blueprint: </h4>
				<textarea 
					value = {this.state.blueprint} 
					onKeyPress={this._handleKeyPress.bind(this)} 
					style = {input2style} 
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