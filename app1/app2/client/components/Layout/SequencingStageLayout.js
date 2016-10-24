import React from "react";
import Sequencer from "../Pages/SequencingStage/sequencer";
import CompleteOverview from "../Pages/SequencingStage/completeoverview";
import ProjectNavigationBar from "../Pages/projectnavigationbar";
import Stranddisplay from "../Pages/DevelopmentStage/stranddisplay";
export default class SequencingStageLayout extends React.Component {
	constructor(){
		super();
	};
	render(){
		const Barstyle = {
			height: "55px", width: "425px"
		}
		const Stranddisplaystyle = {
			width:"950px",position:"relative",top:"-500px",left:"425px",backgroundColor:"white"
		}
		const Workspacestyle = {
			backgroundColor:"white", width: "425px", height:"500px"
		}
		const text1style = {
			fontFamily:"'Pavanam',serif",textAlign:"center", fontWeight:'bold',paddingTop:"20px",fontSize:"22px"
		}
		const text2style = {
			fontFamily:"'Pavanam',serif",textAlign:"center", fontWeight:'bold',paddingTop:"10px",marginBottom:"20px",fontSize:"13px"
		}
		return(
			<div>
				<ProjectNavigationBar/>
		
				<div style = {Workspacestyle}>
					<div style = {text1style}>Stage 2: Sequencing</div>
					<div style = {text2style}>when the conditions and strands are correctly inputted, start the sequencing algorithm. </div>
				
					<Sequencer/>
				</div>
		
				<div style = {Stranddisplaystyle}>
					<Stranddisplay/>
				</div>

			</div>
		);
	}
}