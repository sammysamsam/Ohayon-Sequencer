import React from "react";
import { Link } from "react-router";

import StrandUtilities from '../pages/ToolsAnalysis/StrandUtilities';

import StrandComparer from '../pages/ToolsAnalysis/StrandComparer';

import StrandMeltingPt from '../pages/ToolsAnalysis/StrandMeltingPt';

import FooterSection from '../pages/FooterSection';

import {Collapsible,CollapsibleItem,Tabs,Tab} from 'react-materialize';

import backgroundImage from '../../Images/appbackground.png'


export default class ToolsAnalysis extends React.Component {

	render(){
		const backgroundstyle = {
			background:"rgba(255,255,255,.2)",
			padding:"50px 0px 50px 0px",
			verticalAlign:"top",
			minHeight:"100vh"
		}
		let headerStyle = {
			boxShadow:" 6px 9px 12px -4px rgba(0,0,0,0.56)",
			backgroundColor:"#546e7a",
			width:"1200px",
			height:"100px",
			marginBottom:"0",
			padding:"35px",
			color:"white",
			display:"block",
			margin:"auto"
		}
		let bodyStyle = {
			boxShadow:" 6px 9px 12px -4px rgba(0,0,0,0.56)",
			padding:"25px",
			backgroundColor:"#eceff1",
			width:"1200px",
			display:"block",
			margin:"auto"
		}


		return(
			<div style = {{overflow:"hidden",backgroundImage: 'url('+backgroundImage+')',backgroundSize:"100% 100%"}}>
				<div style = {{backgroundColor:"#292B2D",height:"40px",padding:"3px 0px 0px 75px",fontSize:"13px",width:"100%"}}> 
	
						<Link to="/" className = "hvr-grow" style = {{color:"#ff6600",display:"inline-block",cursor:"pointer"}}>
						
							<i style = {{textDecoration:"none",position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
								home
							</i>
							Optimizing Hybridization AnalYsis Of Nucleotides Program 
						
						</Link>
				</div>
				<div style = {backgroundstyle}>	
					<h4 style = {headerStyle}>
						<i style = {{float:"left",margin:"-10px 20px 0px 0px"}}className=" medium material-icons">
							assignment
						</i>
						TOOLS & ANALYSIS 
					</h4>
					<div style = {bodyStyle}> 					
						
						<p style = {{color:"rgb(238, 110, 115)",textAlign:"center",fontStyle:"italic",padding:"15px 0px 30px 0px"}}> 
							Analyze and manipulate your sequences. 
						</p>
						<Collapsible  popout style = {{width:"1105px"}}>
					  		<CollapsibleItem header = "Sequence Manipulator">
								<StrandUtilities/>
							</CollapsibleItem>
						  	<CollapsibleItem header = "Melting Point Calculator">

								<StrandMeltingPt/>

							</CollapsibleItem>						
							<CollapsibleItem header = "Strand vs Strand Comparison" >

								<StrandComparer/>

							</CollapsibleItem>
						</Collapsible>
					</div>
				</div>

				<FooterSection/>

			</div>
		  );
	}
}
						


/*

						*/
