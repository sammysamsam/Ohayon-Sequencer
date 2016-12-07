import React from "react";
import ResultScreen from "./ResultScreen";

import Spinner from 'react-spinkit';
import Select from 'react-select';
import styles2 from '../../../StyleSheet/hover-min.css';

import Glyphicon from 'react-bootstrap/lib/Glyphicon'

import 'react-bootstrap-table/css/react-bootstrap-table.css';


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

	addComponentsToComparelist(e)
	{
		if(this.state.comparelist.length != 2){
			var temp = this.state.comparelist;
			temp.push( {name:e.label, components:e.value,loop:"false"} );
			this.setState({comparelist : temp});
		}
	}

	//

	callcomparelist(){
		if(this.state.comparelist.length > 2 || this.state.comparelist.length == 0 )
		{
			alert("Please Select 1 or 2 Strands to Compare");
		} else {
			StrandAction.CompareStrands(this.state.comparelist);
		}
	}

	callprintfullstrands(){
		StrandAction.PrintStrandList();
	}
	callprintcomponents(){
		StrandAction.PrintComponentList();
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


	componentsListProcessor(){
			let strandlist = [];
			for(let i = 0; i < this.props.componentlist.length;i ++)
			{
				let name = this.props.componentlist[i].name;
				strandlist.push({value:[name ],label:name});
				if(this.props.componentlist[i].complement == true){
					strandlist.push({value:[name +"'"] ,label:name+"'"});
				}

			}
			return strandlist;
	}
	fullStrandListProcessor()
	{ 

	// components = array of component names
			let strandlist = [];
			for(let i = 0; i < this.props.fulllist.length;i ++)
			{
				let name = this.props.fulllist[i].name;
				strandlist.push({value:name ,label:name});
			}
			return strandlist;
	}


	//

	loadheader()
	{
		let clearButttonStyle = {
			verticalAlign:"top",
			margin:"15px 0px 0px 10px",
			fontSize:"10px",
			cursor:"pointer",
			width:"30px",
			textAlign:"center",
			height:"45px",
			color:"#ffa366"
		}
		const chipStyle = {
			verticalAlign:"top",
			padding:"14px",
			background:"rgba(0,0,0,.2)",
			display:"inline-block",
			textOverflow:"ellipsis",
			maxWidth:"275px",
			maxHeight:"40px",
			whiteSpace:"nowrap",
			marginTop:"-10px",
			borderRadius:"5px",
			overflow:"hidden",
			minWidth:"100px"
		}
		if(this.state.comparelist.length == 1){
			return 	(
			<div style = {{display:"inline-block",marginLeft:"15px"}}>
				<div style = {chipStyle}> 
					{this.state.comparelist[0].name} 
				</div>
				<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist.bind(this,1)}> 
					[clear]
				</span>
			</div>
			)
		}
		if(this.state.comparelist.length == 2)
		{
			return(
				<div style = {{display:"inline-block",marginLeft:"15px"}}>
					<div style = {chipStyle}> 
						{this.state.comparelist[0].name}
					</div>
					<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist.bind(this,1)}> 
						[clear]
					</span>	
					<span style = {{display:"inline-block",marginLeft:"10px",marginRight:"10px"}}> 
					vs 
					</span>
					
					<div style = {chipStyle}> 
						{this.state.comparelist[1].name} 
					</div>
					<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist.bind(this,1)}> 
						[clear]
					</span>
				</div>
				)
		}
	}


	loadbuttons(){
		let analysisButtonStyle = {
			fontFamily:"'Roboto',serif",
			marginLeft:"60px",
			borderWidth:"1px",
			cursor:"pointer",
			height:"50px",
			width:"175px", 
			paddingTop:"15px",
			textAlign:"center",
			display:"inline-block",
			color:"white", 
			fontSize:"14px"
		}
		switch(this.props.status){
			case true:{ 
				return	<div style = {{padding:"0px 0px 85px 330px"}}><Spinner spinnerName='wave' noFadeIn /></div>

			}
			case false:{ 
				return 	 (
				<div style = {{padding:"7px 30px 4px 20px",background:"rgba(0, 0, 0,.6)"}}>
					<div style = {analysisButtonStyle} className= "hvr-underline-from-center" onClick = {this.callcomparelist.bind(this)}>  
						<Glyphicon style = {{marginRight:"5px"}} glyph = "duplicate"/> 
						Compare
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" onClick = {this.callprintfullstrands.bind(this)}>  
						<Glyphicon style = {{marginRight:"5px"}} glyph = "print"/> 
						Print Full Strands
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" onClick = {this.callprintcomponents.bind(this)}>  
						<Glyphicon style = {{marginRight:"5px"}} glyph = "print"/> 
						Print Components
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" >  
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
		let strandsToCompareStyle = {
 	 		height:"60px",
 	 		width:"1025px",
 	 		padding:"0px 0px 5px 20px",
 	 		marginTop:"10px",
 	 		color:"white",

 	 	}
		let compareWorkspaceStyle = {
			background:"rgba(28, 50, 74,.78)",
			marginBottom:"5px",
			padding:"2px 0px 0px 20px"	,
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)"	
		}
		let resultSectionStyle = {
			height:"513px",
			width:"1065px",
			display:"block",
			background:"rgba(255,255,255,.7)"
			,boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
		}

		return(
		<div style={{width:"1065px"}}> 	
			<div style = {compareWorkspaceStyle}>
 	 			<div style={strandsToCompareStyle}> 
					<h5 style = {{display:"inline-block",padding:"20px 30px 20px 20px",background:"rgba(255, 255, 255,.07)",borderRadius:"6px"}}> 
						<Glyphicon style = {{marginRight:"10px"}}glyph = "search"/> 
						Strands/Components Comparison Set:
					</h5> 
					{this.loadheader()}
				</div>

		 		<div style = {{width:"400px",margin:"20px 10px 15px 95px ",display:"inline-block"}} >
		 			<Select 
		 				placeholder="Add Strand Component"
		 				name="form-field-name" 
		 				options={this.componentsListProcessor()}	
		 				onChange = {this.addComponentsToComparelist.bind(this)} />
				</div>
				
				<div style = {{width:"400px",margin:"20px 0px 20px 0px",display:"inline-block",verticalAlign:"top"}} >
					<Select
					 	placeholder="Add Full Strand" 
						name="form-field-name" 
						options={this.fullStrandListProcessor()}	
						onChange = {this.addComponentsToComparelist.bind(this)} />
				</div>
			</div>

			<div style={resultSectionStyle}> 
				{this.loadbuttons()}
 				<ResultScreen results = {this.props.results}/>
			</div>
		</div>
		)
	}
}


