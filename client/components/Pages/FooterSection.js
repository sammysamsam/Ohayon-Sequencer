import React from "react";
import Github from '../../Images/Icons/GithubIcon.png'

export default class FooterSection extends React.Component {

	render(){
		let FooterStyle = {
			color:"#ff7043",
			backgroundColor:"#292B2D",
			height:"157px",
			paddingLeft:"10px",
			paddingTop:"40px"
		}
		let githubStyle ={
			backgroundColor:"#ff7043",
			marginRight:"50px",
			float:"right",
			height:"32px",
			width:"32px",
			padding:"1px",
			borderRadius:"30px"
		}

		return(
			<div style = {FooterStyle}>			
				<div style = {githubStyle}> 
					<a href = "https://github.com/sammysamsam/Ohayon-Sequencer/tree/master">
						<img src = {Github} style = {{height:"30px",width:"30px"}}/>  
					</a>
				</div>
				<div style = {{marginTop:"78px"}}>

				<span style = {{marginLeft:"15px"}}> ©  2016 Copyright</span>
				<span style = {{float:"right",marginRight:"40px"}}> Terms</span>
				<span style = {{float:"right",marginRight:"20px"}}> About</span>
				<span style = {{float:"right",marginRight:"20px"}}> Help</span>
				<span style = {{float:"right",marginRight:"20px"}}> <i className="material-icons">email</i></span>
				</div>
			</div>
		);
	}
}