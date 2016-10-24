import React from "react";
import { Link } from "react-router";
export default class ProjectNagivationBar extends React.Component {
	render(){
		var ulStyle = {
			listStyleType:"none", margin:"0",padding:"0",backgroundColor:"#00334d", width:"1125px",height:"100px",
		}
		var liStyle = {
			float:"left", marginTop: "20px",display:"inline-block",padding:"15px 20px 20px 20px", width:"110px",height:"50px",textAlign:"center",
		}
		var spacerStyle = {
			float:"left",display:"inline-block",padding:"40px 10px", width:"140px",height:"100px",
		}
		var linkstyle= {color:"white",fontFamily: "'Dosis', serif " , fontSize:"20px",textDecoration:"none"}
	

		return(
			<ul style = {ulStyle}>
				<li style = {spacerStyle} ></li>
				<li style = {spacerStyle} ></li>
				<li style = {liStyle}>  <Link to="DevelopmentStage" style = {linkstyle}> Workspace </Link> </li>
				<li style = {spacerStyle} ></li>
				<li style = {liStyle}>  <Link to = "SequencingStage" style = {linkstyle}> Sequencing</Link> </li>
				<li style = {spacerStyle} ></li>
				<li style = {liStyle}>  <Link to = "ResultStage" style = {linkstyle}> Results </Link> </li> 
			</ul>
		);
	}
}