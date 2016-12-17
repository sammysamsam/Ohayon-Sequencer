import React from "react";
import ResultScreen from "./ResultScreen";
import Spinner from 'react-spinkit';
import Select from 'react-select';

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
	addFullStrandToComparelist(e)
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
			alert("Please Select 1 or 2 Strands to Compare");
		else 
		{
			if(this.state.comparelist.length == 1 )
				this.state.comparelist.push(this.state.comparelist[0]);
			StrandAction.CompareStrands(this.state.comparelist);
		}
	}

	callprintfullstrands()
	{
		StrandAction.PrintStrandList();
	}
	callprintcomponents()
	{
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

	// components = array of component names
			let strandlist = [];
			for(let i = 0; i < this.props.fulllist.length;i ++)
			{
				let fullstrand = this.props.fulllist[i];
				strandlist.push({ value:fullstrand.components , label:fullstrand.name});
			}
			return strandlist;
	}


	//

	loadheader()
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

					<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist.bind(this,1)}> 
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
						<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist.bind(this,1)}> 
							[clear]
						</span>	
					</div>
					<span style = {{display:"inline-block",marginLeft:"10px",marginRight:"10px"}}> 
					vs 
					</span>
					
					<div className = "chip"> 
						{this.state.comparelist[1].name} 
						<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist.bind(this,2)}> 
							[clear]
						</span>
					</div>
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
			height:"40px",
			width:"175px", 
			paddingTop:"10px",
			textAlign:"center",
			display:"inline-block",
			color:"#80cbc4",
			fontSize:"14px"
		}
		switch(this.props.status){
			case true:{ 
				return	(
				<div style = {{padding:"7px 30px 4px 380px",background:"rgba(0, 0, 0,.6)"}}> 
						<Spinner spinnerName='wave' noFadeIn />
				</div>)
			}
			case false:{ 
					return (	
						<div style = {{padding:"7px 30px 4px 20px",background:"rgba(0, 0, 0,.6)"}}>
							<div style = {analysisButtonStyle} className= "hvr-underline-from-center" onClick = {this.callcomparelist.bind(this)}>  

								Compare
							</div>
							<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" onClick = {this.callprintfullstrands.bind(this)}>  

								Print Full Strands
							</div>
							<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" onClick = {this.callprintcomponents.bind(this)}>  
					
								Print Components
							</div>
							<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" >  

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
 	 		background:"rgba(255, 255, 255,.07)",
 	 		height:"60px",
 	 		padding:"20px 0px 5px 20px",
 	 		fontSize:"16px",
 	 		color:"white",
 	 	}
		let compareWorkspaceStyle = {
			background:"rgba(28, 50, 74,.55)",
			marginBottom:"2px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)"	
		}
		let resultSectionStyle = {
			height:"550px",
			width:"1045px",
			display:"block",
			background:"rgba(255,255,255,.7)"
			,boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
		}

		return(
		<div style={{width:"1045px"}}> 	
			<div style = {compareWorkspaceStyle}>
 	 			<div style={strandsToCompareStyle}> 
					Strands/Components Comparison Set:
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
						onChange = {this.addComponentsToComparelist.bind(this)} 
						/>
				</div>
			</div>

			<div style={resultSectionStyle}> 
				{this.loadbuttons()}
 				<ResultScreen list = {this.state.comparelist} results = {this.props.results}/>
			</div>
		</div>
		)
	}
}


