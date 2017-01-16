import React from "react";
import Spinner from 'react-spinkit';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class ResultStageButtons extends React.Component {
	constructor()
	{
		super();
		this.callcomparelist = this.callcomparelist.bind(this);
		this.callfullcomparelist = this.callfullcomparelist.bind(this);
		this.callprintfullstrands = this.callprintfullstrands.bind(this);
		this.callprintcomponents = this.callprintcomponents.bind(this);
	}

	callprintfullstrands()
	{
		StrandAction.ClearResults();	
		StrandAction.PrintStrandList();
	}

	callprintcomponents()
	{
		StrandAction.ClearResults();	
		StrandAction.PrintComponentList();
	}

	callcomparelist(){
		StrandAction.ClearResults();
		StrandAction.CompareStrands([]);
	}

	callfullcomparelist()
	{
		StrandAction.ClearResults();
		StrandAction.FullCompareAnalysis();
	}

	render()
	{
		let analysisButtonStyle = {
			fontFamily:"'Roboto',serif",
			marginLeft:"60px",
			borderWidth:"1px",
			cursor:"pointer",
			height:"50px",
			width:"175px", 
			paddingTop:"10px",
			textAlign:"center",
			display:"inline-block",
			color:"#4d4d4d",
			fontSize:"14px"
		}
		if(this.props.status)
				return	(
				<div style = {{padding:"13px 0px 15px 525px",background:"rgba(255, 255, 255,.9)",}}> 
						<Spinner spinnerName='wave' noFadeIn />
				</div>)
		else
			return (	
				<div style = {{paddingTop:"2px",background:"rgba(255,255,255,.9)",border:"solid #ff9e80",borderWidth:"0px 0px 2px 0px"}}>
					
					<div style = {analysisButtonStyle} className= "hvr-underline-from-center" onClick = {this.callfullcomparelist}>  
						
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
							compare
						</i>
						Complete Analysis
					</div>

					<div style = {analysisButtonStyle} className= "hvr-underline-from-center" onClick = {this.callcomparelist}>  
						
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
							compare
						</i>
						2 Strand Comparison
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" onClick = {this.callprintfullstrands}>  
						
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
							print
						</i>
						Print Full Strands
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" onClick = {this.callprintcomponents}>  
						
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
							print
						</i>
						Print Components
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" >  
						
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
							invert_colors
						</i>
						Melting Point
					</div>
				</div>
			)
	}
}


