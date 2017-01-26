import React from "react";
import { Link } from "react-router";

import image3 from "../../images/Icons/AnalysisIcon.png";
import image2 from "../../images/Icons/SequencerIcon.png";
import image1 from "../../images/Icons/WorkspaceIcon.png";



export default class ProjectNagivationBar extends React.Component {



	
	render()
	{
		const ulStyle = {
			boxShadow:" 6px 9px 12px -4px rgba(0,0,0,0.56)",
			listStyleType:"none",
			background:"rgba(19, 29, 45,.85)",
			display:"inline-block",
			height:"692px",
			width:"150px",
			marginTop:"246px",
		}
		const liStyle = {
			padding:"75px 0px 0px 0px", 
			width:"150px",
			height:"200px",
			textAlign:"center"
		}
		const linkstyle = {
			fontFamily: "'Raleway', serif " , 
			textDecoration:"none",
		}
		return(
			<div  className ="animated fadeInLeft" style = {ulStyle}>
				<div style = {liStyle}>   
					<Link to="Project/Development" style = {linkstyle} className = "hvr-forward" > 
						<img src = {image1} style = {{height:"50px",width:"50px"}}/>  
						<h6 style = {{color:"white"}}>Workspace </h6>
					</Link>
				</div>
				<div style = {liStyle}>  
					<Link to = "Project/Sequencing" style = {linkstyle} className = "hvr-forward" >
						<img src = {image2} style = {{height:"50px",width:"50px"}}/>  
						<h6 style = {{color:"white"}}>Sequencing</h6>
					</Link> 
				</div>
				<div style = {liStyle}>  
					<Link to = "Project/Result" style = {linkstyle} className = "hvr-forward" >    
						<img src = {image3} style = {{height:"50px",width:"50px"}}/>  
						<h6 style = {{color:"white"}}> Results</h6> 
					</Link> 
				</div> 
			</div>
		);
	}
}