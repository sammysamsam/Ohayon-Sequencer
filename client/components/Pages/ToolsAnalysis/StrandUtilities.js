import React from "react";
import {FormControl,Button } from "react-bootstrap";
import styles from '../../../StyleSheet/hover-min.css';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


export default class StrandUtilities extends React.Component {

	constructor()
	{
		super();
		this.state = {
					output:"" , 
					input:"" , 
					conversiontype:"false",
					windowstatus:"true"
				};
	}
	handleinput(e)
	{
		let sequence = e.target.value;
		this.setState({input:sequence});

		if(this.state.conversiontype == "false")
		{
			this.complementmaker(e.target.value);
		}
		if(this.state.conversiontype == "true")
		{
			this.reversemaker(e.target.value);
		}
	}
	outputpicker(e)
	{
		if(e.target.value == "false")
		{
			this.complementmaker(this.state.input);
		}
		if(e.target.value == "true")
		{
			this.reversemaker(this.state.input);
		}
		this.setState({conversiontype:e.target.value});

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


	openwindow()
	{
		this.setState({windowstatus:"true"});
	}
	closewindow()
	{
		this.setState({windowstatus:"false"});
	}


//  RENDER METHODS

	renderbottom(){
		let containstyle = { 
			width:"1100px",
			margin:"0px 0px 15px 1px",
			background:"rgba(31, 64, 96,0.7)",
			color:"white",
		    height:"260px"
		}
		let labelstyle = {
			display:"inline-block",
			margin:"0px 0px 0px 30px",
			fontFamily: "'Anaheim', serif " , 
			width:"250px"
		}
		if(this.state.windowstatus == "true")
		{
			return (
				<div className = "dropdowntoolbar1" style = {containstyle}>
					<div style = {labelstyle}> 
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
	}


	render(){
		const titlestyle = {
			width:"1100px",
			height:"50px",
			padding:"15px 10px 5px 40px",
			color:"white",
			fontFamily: "'Anaheim', serif ",
			background:"rgba(57, 115, 172,0.7)",
			margin:"1px"
		}

		return(		 
		<div>				

			<h4 style = {titlestyle}>	
				<Glyphicon style = {{marginRight:"10px"}} glyph = "tasks"/> 
				
				Sequence Manipulator    
				
				<Glyphicon
					className = "hvr-grow"  
					style = {{cursor:"pointer",fontSize:"12px",marginTop:"4px", marginLeft:"10px",float:"right"}} 
					onClick = {this.openwindow.bind(this)} 
					glyph = "resize-full"/> 
				<Glyphicon 
					className = "hvr-grow"  
					style = {{cursor:"pointer",fontSize:"12px",marginTop:"4px",float:"right"}} 
					onClick = {this.closewindow.bind(this)} 
					glyph = "minus"/> 
			</h4>
		
				{this.renderbottom()}
		</div>
	)
}
}