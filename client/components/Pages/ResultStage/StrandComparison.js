import React from "react";
import ResultScreen from "./ResultScreen";

import Spinner from 'react-spinkit';
import Select from 'react-select';
import styles2 from '../../../StyleSheet/hover-min.css';

import Glyphicon from 'react-bootstrap/lib/Glyphicon'


//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class StrandComparison extends React.Component {
	constructor()
	{
		super();
		this.state = {
			comparelist:[]
		}
	}
	//

	handlecomponents(e)
	{
		if(this.state.comparelist.length != 2){
			var temp = this.state.comparelist;
			temp.push( {name:e.label, components:e.value} );
			this.setState({comparelist : temp});
		}
	}

	//

	callcomparelist(){
		if(this.state.comparelist.length > 2 || this.state.comparelist.length == 0 )
		{
			alert("Please Select 1 or 2 Strands to Compare");
		} else{
			StrandAction.CompareStrands(this.state.comparelist);
		}
	}

	callprintlist(){
		StrandAction.PrintStrandlist();
	}
	


	//


	deletecomparelist(f)
	{
		if(this.state.comparelist.length == 1){
			this.setState({comparelist:[]});
		}
		if(this.state.comparelist.length == 2){
			if(f == 1)
			{
				var a = this.state.comparelist[1];
				this.setState({comparelist:[a]});
			}
			if(f == 2)
			{
				var b = this.state.comparelist[0]
				this.setState({comparelist:[b]});
			}
		}
	}
	//


	mutablecompprocessor(){
			let strandlist = [];
			for(let i = 0; i < this.props.componentlist.length;i ++)
			{
				let f = this.props.componentlist[i].name;
				strandlist.push({value:[this.props.componentlist[i].name ],label:f});
				if(this.props.componentlist[i].complement == true){
					strandlist.push({value:[this.props.componentlist[i].name +"'"] ,label:f+"'"});
				}

			}
			return strandlist;
	}
	mutablefullprocessor()
	{ 

	// components = array of component names
			let strandlist = [];
			for(let i = 0; i < this.props.fulllist.length;i ++)
			{
				let f = this.props.fulllist[i].name;
				strandlist.push({value:this.props.fulllist[i].components ,label:f});
			}
			return strandlist;
	}


	//

	loadheader()
	{
		let clearstyle = {
			verticalAlign:"top",
			margin:"15px 0px 0px 10px",
			fontSize:"10px",
			cursor:"pointer",
			width:"30px",
			textAlign:"center",
			height:"45px",
			color:"#ffa366"
		}
		const itemstyle = {
			verticalAlign:"top",
			padding:"14px",
			background:"rgba(0,0,0,.4)",
			display:"inline-block",
			textOverflow:"ellipsis",
			maxWidth:"275px",
			maxHeight:"40px",
			whiteSpace:"nowrap",
			marginTop:"-10px",
			borderRadius:"10px",
			overflow:"hidden"
		}
		if(this.state.comparelist.length == 1){
			return 	(
			<div style = {{display:"inline-block"}}>
				<div style = {itemstyle}> 
					{this.state.comparelist[0].name} 
				</div>
				<span className="hvr-grow" style = {clearstyle} onClick = {this.deletecomparelist.bind(this,1)}> 
					[clear]
				</span>
			</div>
			)
		}
		if(this.state.comparelist.length == 2)
		{
			return(
				<div style = {{display:"inline-block"}}>
					<div style = {itemstyle}> 
						{this.state.comparelist[0].name}
					</div>
					<span className="hvr-grow" style = {clearstyle} onClick = {this.deletecomparelist.bind(this,1)}> 
						[clear]
					</span>	
					<span style = {{display:"inline-block",marginLeft:"10px",marginRight:"10px"}}> 
					vs 
					</span>
					
					<div style = {itemstyle}> 
						{this.state.comparelist[1].name} 
					</div>
					<span className="hvr-grow" style = {clearstyle} onClick = {this.deletecomparelist.bind(this,1)}> 
						[clear]
					</span>
				</div>
				)
		}
	}


	loadbuttons(){
		const buttonstyle = {
			fontFamily:"'Raleway',serif",
			border:"solid",
			borderColor:"#ff751a",
			background:"rgba(255, 102, 0,.7)",
			borderRadius:"20px",
			marginLeft:"100px",
			borderWidth:"1px",
			cursor:"pointer",
			height:"38px",
			width:"155px", 
			paddingTop:"9px",
			textAlign:"center",
			display:"inline-block",
			color:"white", 
			fontSize:"13px"
		}
		switch(this.props.status){
			case true:{ 
				return	<div style = {{padding:"0px 0px 85px 330px"}}><Spinner spinnerName='wave' noFadeIn /></div>

			}
			case false:{ 
				return 	 (
				<div style = {{padding:"10px 30px 10px 90px",background:"rgba(0,0,0,.7)"}}>
					<div style = {buttonstyle} className= "hvr-grow" onClick = {this.callcomparelist.bind(this)}>  
						<Glyphicon style = {{marginRight:"5px"}} glyph = "duplicate"/> 
						Compare
					</div>
					<div style = {buttonstyle}  className= "hvr-grow" onClick = {this.callprintlist.bind(this)}>  
						<Glyphicon style = {{marginRight:"5px"}} glyph = "print"/> 
						Print Strands
					</div>
					<div style = {buttonstyle}  className= "hvr-grow" >  
						<Glyphicon style = {{marginRight:"5px"}} glyph = "tint"/> 
						Melting Point
					</div>
				</div>
				)
			}
		}
	}

	//background:"rgba(28, 50, 74,.78)"

	render(){
		let comparesetstyle = {
 	 		height:"50px",
 	 		width:"1025px",
 	 		padding:"5px 0px 5px 20px",
 	 		marginTop:"20px",
 	 		color:"white",
 	 		border:"solid",
 	 		borderColor:"white",
 	 		borderWidth:"thin",
 	 	}
		let comparesectionstyle = {
			background:"rgba(28, 50, 74,.78)",marginBottom:"5px",padding:"2px 0px 0px 20px"	,boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)"	
		}
		let resultsection = {
			height:"513px",
			width:"1065px",
			display:"block",
			background:"rgba(255,255,255,.7)"
			,boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
		}
		return(
		<div style={{width:"1065px"}}> 
		 		
			<div style = {comparesectionstyle}>
 	 			<div style={comparesetstyle}> 
					<h5 style = {{display:"inline-block",paddingRight:"30px"}}> 
						<Glyphicon style = {{marginRight:"10px"}}glyph = "search"/> 
						Strands/Components Comparison Set:
					</h5> 
					{this.loadheader()}
				</div>

		 		<div style = {{width:"400px",margin:"20px 10px 15px 95px ",display:"inline-block"}} >
		 			<Select 
		 				placeholder="Add Strand Component"
		 				name="form-field-name" 
		 				options={this.mutablecompprocessor()}	
		 				onChange = {this.handlecomponents.bind(this)} />
				</div>
				
				<div style = {{width:"400px",margin:"20px 0px 20px 0px",display:"inline-block",verticalAlign:"top"}} >
					<Select
					 	placeholder="Add Full Strand" 
						name="form-field-name" 
						options={this.mutablefullprocessor()}	
						onChange = {this.handlecomponents.bind(this)} />
				</div>
			</div>

			<div style={resultsection}> 
				{this.loadbuttons()}
 				<ResultScreen results = {this.props.results}/>
			</div>
		</div>
		)
	}
}


