import React from "react";
import { Link } from "react-router";

import ProjectNavigationBar from "../Pages/ProjectNavigationBar";
import LoadSave from "../Pages/LoadSave";
import backgroundImage from '../../Images/appbackground.png'
import {Modal,Button} from 'react-materialize';
import FooterSection from "../Pages/FooterSection";

export default class ProjectLayoutMain extends React.Component {
	render(){
		let stageContainerStyle = {
			height:"885px",
			display:"inline-block",
			verticalAlign:"top",
			marginLeft:"2px",
			marginBottom:"40px"
		}

		return(
		<div style = {{overflow:"hidden"}}>
			<div style = {{textDecoration:"none",backgroundColor:"#292B2D",height:"40px",padding:"2.5px 0px 0px 75px",margin:"0px",fontSize:"13px",width:"100%"}}> 
					<Link to="/"className = "hvr-grow" style = {{color:"#ff7043",display:"inline-block",cursor:"pointer"}}>
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
							home
						</i>
						Optimizing Hybridization AnalYsis Of Nucleotides Program 
					</Link>

					<LoadSave/>
			</div>

			<div style = {{backgroundImage: 'url('+backgroundImage+')',backgroundSize:"1700px 1700px"}}>
				<div style = {{background:"rgba(255,255,255,.5)"}}>
					<div style = {{padding:"30px 0px 30px 0px", margin:"auto",display:"block",width:"1200px"}}>

						<ProjectNavigationBar/>	
						
						<div style = {stageContainerStyle}>	
							{this.props.children}
						</div>
						
					</div>
				</div>
			</div>
			<FooterSection/>
		</div>
		);
	}
}