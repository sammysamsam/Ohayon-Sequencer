import React from "react";
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
//import styles from '../../StyleSheet/bootstrap3.3.7/css/bootstrap.min.css'
import ProjectNavigationBar from "../Pages/ProjectNavigationBar";
import FooterSection from "../Pages/FooterSection";


export default class ProjectLayoutMain extends React.Component {
	

	render(){
		let stageContainerStyle = {
			height:"870px",
			display:"inline-block",
			verticalAlign:"top",
			marginLeft:"3px"
		}


		return(
		<div>
			<h6 style = {{color:"#ff6600",textDecoration:"none",backgroundColor:"#292B2D",height:"40px",padding:"15px 0px 0px 60px",margin:"0px"}}> 
				<Glyphicon  style = {{marginRight:"5px"}}glyph = "globe"/> 
			
				Optimizing Hybridization AnalYsis Of Nucleotides Program 
			</h6>
			<div style = {{backgroundImage: "url('http://www.lirent.net/wp-content/uploads/2014/10/Android-Lollipop-Material-Design-Wallpaper-IdeaLTriangles.png')",backgroundSize:"1500px 1300px"}}>
				<div style = {{paddingLeft:"55px",paddingTop:"35px",background:"rgba(255,255,255,.5)"}}>
					
						<ProjectNavigationBar StageNumber = {1}/>			
						<div style = {stageContainerStyle}>	
							{this.props.children}
						</div>
				</div>
			</div>
			<FooterSection/>
		</div>
		);
	}
}