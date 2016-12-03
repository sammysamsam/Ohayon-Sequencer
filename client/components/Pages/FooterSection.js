import React from "react";
import styles from '../../StyleSheet/hover-min.css';
import { Link } from "react-router";
//import image1 from "../../images/";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
export default class FooterSection extends React.Component {

	render(){
		const FooterStyle = {
			color:"#ff6600",
			backgroundColor:"#292B2D",
			height:"170px"
		}
		const iconstyle = {
			marginLeft:"600px",
			paddingTop:"80px",
			fontSize:"40px"
		}


		return(
			<div style = {FooterStyle}>
				 <div style = {iconstyle}><Glyphicon glyph = "tint"/></div>
			</div>
		);
	}
}