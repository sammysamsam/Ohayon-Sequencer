import React from "react";
import {Input} from 'react-materialize';

export default class StrandUtilities extends React.Component {

	constructor()
	{
		super();
		this.state = {
					output:"" , 
					input:"" , 
					conversiontype:"false",
				};
	}
	handleinput(input)
	{
		let sequence = input.target.value;
		this.setState({input:sequence});

		if(this.state.conversiontype == "false")
			this.complementmaker(input.target.value);
		
		if(this.state.conversiontype == "true")
			this.reversemaker(input.target.value);
	}
	outputpicker(input)
	{
		if(input.target.value == "false")
			this.complementmaker(this.state.input);
		if(input.target.value == "true")
			this.reversemaker(this.state.input);
		this.setState({conversiontype:input.target.value});

	}
	complementmaker(e)
	{
		let input = e.split('');
		let comp = "";
		for(let i = 0 ; i < input.length ; i ++)
		{
			let string1 = input[i];
			if(string1.toUpperCase() == "A")
				string1 = "T";
			else if(string1.toUpperCase() == "T")
				string1 = "A";
			else if(string1.toUpperCase() == "C")
				string1 = "G";
			else if(string1.toUpperCase() == "G")
				string1 = "C";
			comp = comp + string1;
		}
		this.setState({output:comp})
	}
	reversemaker(e)
	{
		let reverse = e.split("").reverse();
		reverse = reverse.join("");
		this.setState({output:reverse})
	}

//  RENDER METHODS

	render(){
		let bodyStyle = { 
			width:"1100px",
		    padding:"25px",
		    backgroundColor:"#eceff1"
		}
		let labelStyle = {
			padding:"10px",
			fontFamily: "'Anaheim', serif " , 
			width:"250px",
		}
			return (
				<div style = {bodyStyle}>
					<div style = {{width:"750px"}}>
						<Input
							s={12}
							value = {this.state.blueprint} 
							label="Strand Sequence (i.e.) ATCG"
							type = "text"
							onChange = {this.handleinput.bind(this)}
						/>
					</div>
					<div style = {labelStyle}> 
						<Input 					
							name="comp/rev" 		
							defaultChecked = {false} 
							value={true}  
							type="radio"
							label = "Reverse"
							onClick = {this.outputpicker.bind(this)} 
						/>
						<Input 					
							name="comp/rev" 		
							defaultChecked = {true} 
							value={false}  
							type="radio"
							label = "Complement"
							onClick = {this.outputpicker.bind(this)} 
						/>
					</div>
					<p style = {{background:"rgba(0, 0, 0,.15)",padding:"15px",minHeight:"110px",overflowWrap:"break-word"}}> 
						{this.state.output}
					</p>
					
				</div>

			)
	}
}