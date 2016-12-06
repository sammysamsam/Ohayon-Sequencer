import React from "react";
import StrandUtilities from '../pages/ToolsAnalysis/StrandUtilities';
import StrandComparer from '../pages/ToolsAnalysis/StrandComparer';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from '../../StyleSheet/hover-min.css';
import { Link } from "react-router";


export default class ToolsAnalysis extends React.Component {
	render(){
		const backgroundstyle = {
			marginTop:"-10px", 
			paddingBottom:"50px",
			verticalAlign:"top",
			marginLeft:"50px",
			minHeight:"530px"
		}
		let homebutton = {
			fontSize:"15px",
			textDecoration:"none",
			color:"white",
			border:"solid",
			height:"35px",
			width:"35px",
			display:"inline-block",
			padding:"5px 0px 0px 6.5px", 
			margin:"20px 0px 0px 20px",
			borderRadius:"10px"
		}

		return(
		<div style = {{marginTop:"-10px",backgroundImage: "url('http://www.lirent.net/wp-content/uploads/2014/10/Android-Lollipop-Material-Design-Wallpaper-IdeaLTriangles.png')",backgroundSize:"1300px 900px"}}>
			
			<div style = {{background:"rgba(255,255,255,.5)"}}>
				
				<h6 style = {{color:"#ff6600", textDecoration:"none",backgroundColor:"#292B2D",height:"40px",padding:"15px 0px 0px 60px",opacity:".99"}}> <Glyphicon glyph = "globe"/> Optimizing Hybridization AnalYsis Of Nucleotides Program </h6>
			
				<div style = {backgroundstyle}>	
							
					<div style = {{borderRadius:"10px",marginTop:"50px",padding:"5px",color:"white",background:"rgba(28, 50, 74,.95)",width:"1175px"}}> 
						
						<Link to="/"  className = "hvr-grow" style = {homebutton}>   <Glyphicon glyph = "home"/> </Link>
						
						<h1 style = {{marginLeft:"320px",verticalAlign:"top",fontFamily:"'raleway',serif",display:"inline-block"}}> 
							<Glyphicon style = {{marginRight:"10px"}} glyph = "wrench"/> 
							TOOLS & ANALYSIS 
						</h1>
					</div>
					
					<div style  = {{borderRadius:"10px",marginTop:"3px",paddingTop:"20px",background:"rgba(51, 51, 51,.8)",width:"1175px",paddingBottom:"20px"}}>	
						
						<div style = {{marginLeft:"30px"}}>
							<StrandUtilities/>
						</div>
						<div style = {{marginLeft:"30px",marginTop:"20px"}}>
							<StrandComparer/>
						
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
}