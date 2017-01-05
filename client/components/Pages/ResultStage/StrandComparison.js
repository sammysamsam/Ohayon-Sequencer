import React from "react";
import ResultScreen from "./ResultScreen";
import Select from 'react-select';
import {Button} from 'react-materialize'
//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class StrandComparison extends React.Component {
	constructor()
	{
		super();
		this.deletecomparelist1 = this.deletecomparelist.bind(this,1);
		this.deletecomparelist2 = this.deletecomparelist.bind(this,2);
		this.callcomparelist = this.callcomparelist.bind(this);
		this.addComponentsToComparelist = this.addComponentsToComparelist.bind(this);

		this.state = {
			comparelist:[],
		}
	}
	//

	addComponentsToComparelist(e)
	{
		StrandAction.ClearResults();		

		if(this.state.comparelist.length != 2){
			var temp = this.state.comparelist;
			temp.push( {name:e.label, components:e.value,loop:"false"} );		
			this.setState({comparelist : temp});
		}
	}
	addFullStrandToComparelist(e)
	{
		StrandAction.ClearResults();		

		if(this.state.comparelist.length != 2){
			var temp = this.state.comparelist;
			temp.push( {name:e.label, components:e.value,loop:"false"} );		
			this.setState({comparelist : temp});
		}
	}
	//

	callcomparelist()
	{
		StrandAction.ClearResults();

		if(this.state.comparelist.length > 2 || this.state.comparelist.length == 0 )
			Materialize.toast("Please Select 1 or 2 Strands to Compare",2000);
		else 
		{
			if(this.state.comparelist.length == 1 )
				this.state.comparelist.push(this.state.comparelist[0]);
			StrandAction.CompareStrands(this.state.comparelist);
		}
	}
	//


	deletecomparelist(f)
	{
		StrandAction.ClearResults();		
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


	componentsListProcessor()
	{
		let strandlist = [];
		for(let i = 0; i < this.props.componentlist.length;i ++)
		{
			let name = this.props.componentlist[i].name;
			strandlist.push({value:[name ],label:name});
			if(this.props.componentlist[i].complement){
				strandlist.push({value:[name +"'"],label:name+"'"});
			}
		}
		return strandlist;
	}

	fullStrandListProcessor()
	{ 
		let strandlist = [];
		for(let i = 0; i < this.props.fulllist.length;i ++)
		{
			let fullstrand = this.props.fulllist[i];
			strandlist.push({ value:fullstrand.components , label:fullstrand.name});
		}
		return strandlist;
	}


	//

	loadComparisonSet()
	{
		let clearButttonStyle = {
			verticalAlign:"top",
			margin:"0px 0px 0px 10px",
			fontSize:"10px",
			cursor:"pointer",
			width:"30px",
			textAlign:"center",
			height:"45px",
			color:"#ffa366"
		}

		if(this.state.comparelist.length == 1){
			return 	(
			<div className= "animated fadeIn" style = {{display:"inline-block",margin:"-10px 0px 0px 15px"}}>
				<div className = "chip"> 
					{this.state.comparelist[0].name} 
					<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist1}> 
						[clear]
					</span>
				</div>
			</div>
			)
		}
		if(this.state.comparelist.length == 2)
		{
			return(
				<div className= "animated fadeIn" style = {{display:"inline-block",margin:"-10px 0px 0px 15px"}}>
					<div className = "chip"> 
						{this.state.comparelist[0].name}
						<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist1}> 
							[clear]
						</span>	
					</div>
					<span style = {{display:"inline-block",marginLeft:"10px",marginRight:"10px"}}> 
					vs 
					</span>
					
					<div className = "chip"> 
						{this.state.comparelist[1].name} 
						<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist2}> 
							[clear]
						</span>
					</div>
				</div>
				)
		}
	}
	renderCompareWorkspace()
	{
		let strandsToCompareStyle = {
 	 		height:"55px",
 	 		padding:"25px 0px 5px 20px",
 	 		fontSize:"16px",
 	 		color:"#333333",
 	 	}
		let compareWorkspaceStyle = {
			background:"rgba(217, 217, 217,.95)",
			boxShadow:" 9px 0px 12px -4px rgba(0,0,0,0.56)"	,
		}
		let resultSectionStyle = {
			height:"568px",
			width:"1045px",
			display:"block",
			marginTop:"2px",
			background:"rgba(255,255,255,.7)",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
		}

		return(
		<div>
			<div style = {compareWorkspaceStyle}>

 	 			<div style={strandsToCompareStyle}> 
					Select 1 or 2 Strands:
					{this.loadComparisonSet()}

				</div>

		 		<div style = {{width:"400px",margin:"15px 10px 10px 35px ",display:"inline-block"}} >
		 			<Select 
		 				placeholder="Add Strand Component"
		 				name="form-field-name" 
		 				options={this.componentsListProcessor()}	
		 				onChange = {this.addComponentsToComparelist} />
				</div>
				
				<div style = {{width:"400px",margin:"15px 0px 10px 0px",display:"inline-block",verticalAlign:"top"}} >
					<Select
					 	placeholder="Add Full Strand" 
						name="form-field-name" 
						options={this.fullStrandListProcessor()}	
						onChange = {this.addComponentsToComparelist} 
						/>
				</div>
				<Button 
					style = {{width:"125px",float:"right",fontSize:"11px",margin:"15px 20px 0px 0px"}}
					onClick = {this.callcomparelist}> 
					Compare
				</Button>
			</div>

			<div style={resultSectionStyle}> 
 				<ResultScreen list = {this.state.comparelist} results = {this.props.results}/>
			</div>
		</div>
		)
	}


	render(){
		let resultSectionStyle = {
			height:"693px",
			width:"1045px",
			display:"block",
			marginTop:"4px",
			background:"rgba(255,255,255,.7)",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
		}
		if(this.props.results[0] == "COMPARE")
			return this.renderCompareWorkspace();

		return(					
			<div style={resultSectionStyle}> 
 				<ResultScreen list = {this.state.comparelist} results = {this.props.results}/>
			</div>
			)
	}
}


