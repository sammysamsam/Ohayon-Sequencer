import React from "react";
import styles from '../../StyleSheet/hover-min.css';
import { Link } from "react-router";
import image3 from "../../images/AnalysisIcon.png";
import image2 from "../../images/SequencerIcon.png";
import image1 from "../../images/WorkspaceIcon.png";
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
export default class ProjectNagivationBar extends React.Component {
	render()
	{
		const ulStyle = {
			boxShadow:" 6px 9px 12px -4px rgba(0,0,0,0.56)",
			listStyleType:"none",
			background:"rgba(51, 102, 153,.88)",
			float:"left",
			height:"804px",
			width:"150px",
			marginTop:"30px",
			marginLeft:"0px",
			position:"relative",
			left:"30px"
		}
		const liStyle = {
			padding:"65px 0px 0px 0px", 
			width:"150px",
			height:"200px",
			textAlign:"center"
		}
		const HomeStyle = {
			padding:"35px 0px 0px 0px", 
			width:"150px",
			height:"75px",
			textAlign:"center"
		}
		const linkstyle = {
			fontFamily: "'Raleway', serif " , 
			textDecoration:"none",
			color:"white"
		}
		let homebutton = {
			fontSize:"15px",
			color:"white",
			height:"35px",
			width:"35px",
			paddingTop:"5px"
		}

		return(
			<div style = {ulStyle}>
				<div style = {HomeStyle}>  
					<Link to="/"  className = "hvr-grow" style = {homebutton}>   
						<Glyphicon glyph = "home"/>    
					</Link><hr style = {{height:"1px",width:"100px"}}/> 	
				</div>
				<div style = {liStyle}>   
					<Link to="DevelopmentStage" style = {linkstyle} className = "hvr-forward" > 
						<img src = {image1} style = {{height:"50px",width:"50px"}}/>  
						<h4>Workspace </h4>
					</Link>
				</div>
				<div style = {liStyle}>  
					<Link to = "SequencingStage" style = {linkstyle} className = "hvr-forward" >
						<img src = {image2} style = {{height:"50px",width:"50px"}}/>  
						<h4>Sequencing</h4>
					</Link> 
				</div>
				<div style = {liStyle}>  
					<Link to = "ResultStage" style = {linkstyle} className = "hvr-forward" >    
						<img src = {image3} style = {{height:"50px",width:"50px"}}/>  
						<h4> Results</h4> 
					</Link> 
				</div> 
			</div>
		);
	}
}