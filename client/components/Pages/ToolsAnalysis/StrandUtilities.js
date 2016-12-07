import React from "react";
import {FormControl,Button } from "react-bootstrap";
import styles from '../../../StyleSheet/hover-min.css';
//import styles2 from '../../../StyleSheet/materialize/css/materialize.css';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
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
		{
			this.complementmaker(input.target.value);
		}
		if(this.state.conversiontype == "true")
		{
			this.reversemaker(input.target.value);
		}
	}
	outputpicker(input)
	{
		if(input.target.value == "false")
		{
			this.complementmaker(this.state.input);
		}
		if(input.target.value == "true")
		{
			this.reversemaker(this.state.input);
		}
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
			{
				string1 = "T";
			}else if(string1.toUpperCase() == "T")
			{
				string1 = "A";
			}else if(string1.toUpperCase() == "C")
			{
				string1 = "G";
			}else if(string1.toUpperCase() == "G")
			{
				string1 = "C";
			}else{
				string1 = "*"
			}
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

	renderbottom(){
		let bodyStyle = { 
			width:"1100px",
			margin:"0px 0px 15px 1px",
			background:"rgba(31, 64, 96,0.7)",
			color:"white",
		    height:"260px"
		}
		let labelStyle = {
			display:"inline-block",
			margin:"0px 0px 0px 30px",
			fontFamily: "'Anaheim', serif " , 
			width:"250px"
		}
			return (
				<div className = "dropdowntoolbar1" style = {bodyStyle}>
					<div style = {labelStyle}> 
						<h5>Select One: </h5>
						<div style = {{height:"50px", border:"solid",borderWidth:".5px",borderColor:"white",padding:"10px 0px 0px 20px"}}>
							<label style = {{marginLeft:"10px"}} >
								<input  
									style = {{marginRight:"10px"}}
									value = {true} 
									defaultChecked = {false} 
									name= "comp/rev" 
									type="radio" 
									onClick = {this.outputpicker.bind(this)} 
								/> 
								Reverse 
							</label>
							<label style = {{marginLeft:"10px"}}>
								<input  
									style = {{marginRight:"10px"}}
									value = {false} 
									defaultChecked = {true} 
									name= "comp/rev"
									type="radio" 
									onClick = {this.outputpicker.bind(this)} 
								/> 
								Complement
							</label>
						</div>
					</div>

					<div style = {{display:"inline-block",verticalAlign:"top",marginLeft:"30px",paddingTop:"0px"}}>
						
						<h5 style = {{	fontFamily: "'Dosis', serif " ,  height:"35px"}}>	
							Insert Strand Sequence:	
						</h5>
						
						<FormControl type = "text" style = {{width:"760px",marginTop:"-20px",color:"black",fontSize:"15px",fontFamily: "'Anaheim', serif ",height:"50px"}}  onChange = {this.handleinput.bind(this)}/>
					</div>

					<h5 style = {{	fontFamily: "'Dosis', serif " , height:"29px",marginLeft:"30px"}}> 
						Output: 
					</h5>

					<h4 style = {{color:"black",marginLeft:"10px",fontFamily: "'Dosis', serif " , height:"90px",width:"1070px",background:"rgba(255, 255, 255,.9)",overflowY:"scroll",padding:"10px"}}> 
						{this.state.output}
					</h4>
					<br/>
				</div>

			)
	}

	render(){


		return(		 
		<div>				
				{this.renderbottom()}
		</div>
	)
}
}