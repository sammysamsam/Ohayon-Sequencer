import React from "react";
import { Link } from "react-router";

export default class FooterSection extends React.Component {

	render(){
		let FooterStyle = {
			color:"#ff7043",
			backgroundColor:"#292B2D",
			height:"170px",
			paddingTop:"130px",
			paddingLeft:"10px"
		}


		return(
			<div style = {FooterStyle}>
				<span>2016 Copyright</span>
			</div>
		);
	}
}