import React from "react";
import FooterSection from "../Pages/FooterSection";
import Sequencer from "../Pages/SequencingStage/Sequencer";
import ProjectNavigationBar from "../Pages/ProjectNavigationBar";
import SequencingStrandTable from "../Pages/SequencingStage/SequencingStrandTable";
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

//STORE
import StrandlistStore from "../Store/StrandlistStore";


export default class SequencingStageLayout extends React.Component {
	
	constructor(){
		super();
		this.updateconditions = this.updateconditions.bind(this);
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatestatus = this.updatestatus.bind(this);
		this.state = {  
						Salt: StrandlistStore.getConditions().Salt, 
						Concentration: StrandlistStore.getConditions().Concentration,
						Component_List: StrandlistStore.getStrandComponents(),
						sequencerstatus: StrandlistStore.getJavaProgramStatus(),
						sequencertimeout: StrandlistStore.getSequencerTimeout()
					}
	}
	componentWillMount() {
		StrandlistStore.on("Change_Condition", this.updateconditions);
		StrandlistStore.on("Change_Component_Strandlist",this.updateComponentlist);
		StrandlistStore.on("Java_Status_Updater",this.updatestatus);
		StrandlistStore.on("Update_Sequencer_Status",this.updatesequencerstatus);
	}
	componentWillUnmount() {
		StrandlistStore.removeListener("Change_Condition", this.updateconditions)
		StrandlistStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		StrandlistStore.removeListener("Java_Status_Updater",this.updatestatus);
		StrandlistStore.removeListener("Update_Sequencer_Status",this.updatesequencerstatus);

	}
	updatesequencerstatus(){
		this.setState({ sequencertimeout: StrandlistStore.getSequencerTimeout() });
	}
	updateconditions(){
		this.setState({ Salt: StrandlistStore.getConditions().Salt})
		this.setState({ Concentration: StrandlistStore.getConditions().Concentration})
	}
	updateComponentlist(){
		this.setState( {Component_List: StrandlistStore.getStrandComponents()});
	}
	updatestatus(){
			this.setState( {strandlistlength: StrandlistStore.getStrandComponents().length, sequencerstatus: StrandlistStore.getJavaProgramStatus() })
	}
	render(){
		const titlestyle= {
			fontFamily:"'raleway',serif",padding:"20px 0px 0px 55px",color:"white"
		}
		const backgroundstyle = {
			marginTop:"-10px", height:"855px",verticalAlign:"top",marginLeft:"180px"
		}
		let topstyle = {
			fontFamily:"'raleway',serif",margin:"50px 50px 0px 4px",padding:"35px",
			color:"white",
			background:"rgba(28, 50, 74,.88)",   
			width:"1065px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56",textAlign:"center"
		}
		let middlestyle = {
			margin:"5px 0px 0px 4px",
			padding:"15px 0px 0px 400px",
			background:"rgba(28, 50, 74,.63)", 
			width:"1065px",
			height:"87px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)"
		}
		let bottomstyle = {
			margin:"5px 0px 0px 4px",
			padding:"10px 0px 0px 5px",
			background:"rgba(28, 50, 74,.88)",
			background:"rgba(28, 50, 74,.73)",
			width:"1065px",
			height:"534px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)"
		}

		return(
		<div>
				<div style = {{marginTop:"-10px",backgroundImage: "url('http://www.lirent.net/wp-content/uploads/2014/10/Android-Lollipop-Material-Design-Wallpaper-IdeaLTriangles.png')",backgroundSize:"1400px 1000px"}}>
					<div style = {{background:"rgba(255,255,255,.5)"}}>		
						<h6 style = {{color:"#ff6600", textDecoration:"none",backgroundColor:"#292B2D",height:"40px",padding:"15px 0px 0px 60px",opacity:".9"}}> <Glyphicon glyph = "globe"/> Optimizing Hybridization AnalYsis Of Nucleotides Program </h6>
						
						<ProjectNavigationBar StageNumber = {2}/>		
						
						<div style = {backgroundstyle}>	
									
								<div style = {topstyle}>
										<h1> SEQUENCING ALGORITHM </h1>
										<h5 style = {{width:"1000px",paddingTop:"10px"}}> Read over your Strand Components and then start the sequencing algorithm when ready </h5>
									</div>
									
								<div style = {middlestyle}>
										<Sequencer status = {this.state.sequencerstatus} componentlength = {this.state.Component_List.length}/>
									</div>

								<div style  = {bottomstyle}>
										<SequencingStrandTable/>
									</div>
						</div>
					</div>
				</div>
				<FooterSection/>
		</div>
		);

	}
}