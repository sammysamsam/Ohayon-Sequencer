import React from "react";


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
			cursor:"pointer",
			height:"50px",
			width:"175px", 
			paddingTop:"10px",
			textAlign:"center",
			color:"#4e4e4f",
			fontSize:"14px"
		}
		let analysisButtonOffStyle = {
			fontFamily:"'Roboto',serif",
			marginLeft:"60px",
			height:"50px",
			width:"175px", 
			paddingTop:"10px",
			textAlign:"center",
			color:"#c6c6c6",
			fontSize:"14px"
		}
		let iconStyle = {
			position:"relative",
			top:"6px",
			paddingRight:"10px"
		}
		let containerStyle  = {
			background:"rgba(255,255,255,.9)",
		}
		console.log("buttons "+this.props.status);
		if(this.props.status)
			return (	
				<div style = {containerStyle}>
					<div style = {analysisButtonOffStyle} >  
						<i style = {iconStyle} className="material-icons">compare</i>
						Complete Analysis
					</div>

					<div style = {analysisButtonOffStyle}>  
						<i style = {iconStyle} className="material-icons">compare </i>
						2 Strand Comparison
					</div>
					<div style = {analysisButtonOffStyle} >  
						<i style = {iconStyle} className="material-icons">print</i>
						Print Full Strands
					</div>
					<div style = {analysisButtonOffStyle} >  
						<i style = {iconStyle} className="material-icons">print</i>
						Print Components
					</div>
					<div style = {analysisButtonOffStyle}  >  
						<i style = {iconStyle} className="material-icons">invert_colors</i>
						Melting Point
					</div>
				</div>
			)
		else
			return (	
				<div style = {containerStyle}>
					
					<div style = {analysisButtonStyle} className= "hvr-underline-from-center" onClick = {this.callfullcomparelist}>  
						
						<i style = {iconStyle} className="material-icons">
							compare
						</i>
						Complete Analysis
					</div>

					<div style = {analysisButtonStyle} className= "hvr-underline-from-center" onClick = {this.callcomparelist}>  
						
						<i style = {iconStyle} className="material-icons">
							compare
						</i>
						2 Strand Comparison
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" onClick = {this.callprintfullstrands}>  
						
						<i style = {iconStyle} className="material-icons">
							print
						</i>
						Print Full Strands
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" onClick = {this.callprintcomponents}>  
						
						<i style = {iconStyle} className="material-icons">
							print
						</i>
						Print Components
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" >  
						
						<i style = {iconStyle} className="material-icons">
							invert_colors
						</i>
						Melting Point
					</div>
				</div>
			)
	}
}


