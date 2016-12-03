import React from "react";
import FooterSection from "../Pages/FooterSection";
import ProjectNavigationBar from "../Pages/ProjectNavigationBar";
import StrandComparison from "../Pages/ResultStage/StrandComparison";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

//STORE
import StrandlistStore from "../Store/StrandlistStore";

export default class ResultStateLayout extends React.Component {

	constructor(){
		super()
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatefullstrandlist = this.updatefullstrandlist.bind(this);
		this.updatestatus = this.updatestatus.bind(this);
		this.updateresults = this.updateresults.bind(this);
		this.state = {  
				Results:StrandlistStore.getDataAnalysisResults(),
				Salt: StrandlistStore.getConditions().Salt, 
				Concentration: StrandlistStore.getConditions().Concentration,
				Component_List: StrandlistStore.getStrandComponents(),
				Full_List: StrandlistStore.getFullStrands(),
				programstatus: StrandlistStore.getJavaProgramStatus()
			}
	};

	componentWillMount() {
		StrandlistStore.on("Update_Results",this.updateresults);
		StrandlistStore.on("Java_Status_Updater",this.updatestatus);
		StrandlistStore.on("Change_Condition", this.updateconditions);
		StrandlistStore.on("Change_Full_Strandlist",this.updatefullstrandlist);
		StrandlistStore.on("Change_Component_Strandlist",this.updateComponentlist);
	}
	componentWillUnmount() {
		StrandlistStore.removeListener("Update_Results",this.updateresults);
		StrandlistStore.removeListener("Java_Status_Updater",this.updatestatus)
		StrandlistStore.removeListener("Change_Condition", this.updateconditions)
		StrandlistStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		StrandlistStore.removeListener("Change_Full_Strandlist",this.updatefullstrandlist);
	}
	updateconditions(){
		this.setState({ Salt: StrandlistStore.getConditions().Salt})
		this.setState({ Concentration: StrandlistStore.getConditions().Concentration})
	}
	updateComponentlist(){
		this.setState( {Component_List: StrandlistStore.getStrandComponents()});
	}
	updatefullstrandlist(){
		this.setState( {Full_List: StrandlistStore.getFullStrands() })
	}
	updatestatus(){
		this.setState( {sequencerstatus: StrandlistStore.getJavaProgramStatus() })
	}
	updateresults(){
		this.setState({	Results:StrandlistStore.getDataAnalysisResults()})
	}
	render(){
		let Workspacestyle = {
			width: "100px", 
			height:"50px",
			position:"absolute",
			top:"150px",
			right:"300px"
		}
		let titlestyle= {
			fontFamily:"'raleway',serif",
			padding:"20px 0px 0px 55px",
			color:"white"
		}
		let backgroundstyle = {
			marginTop:"-10px", 
			height:"870px",
			verticalAlign:"top",
			marginLeft:"180px"
		}
		let topstyle = {
			fontFamily:"'raleway',serif",
			margin:"50px 50px 0px 4px",
			padding:"20px 0px 10px 0px ",
			color:"white",
			background:"rgba(28, 50, 74,.88)",  
			width:"1065px",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
			textAlign:"center"
		}
		let bottomstyle = {
			margin:"5px 0px 0px 4px",
			width:"1065px",
			height:"665px"
		}

		return(
		<div>
			<div style = {{marginTop:"-10px",backgroundImage: "url('http://www.lirent.net/wp-content/uploads/2014/10/Android-Lollipop-Material-Design-Wallpaper-IdeaLTriangles.png')",backgroundSize:"1400px 1000px"}}>
				<div style = {{background:"rgba(255,255,255,.5)"}}>			
					<h6 style = {{color:"#ff6600", textDecoration:"none",backgroundColor:"#292B2D",height:"40px",padding:"15px 0px 0px 60px",opacity:".9"}}> 
						<Glyphicon glyph = "globe"/> 
						Optimizing Hybridization AnalYsis Of Nucleotides Program 
					</h6>
					
					<ProjectNavigationBar StageNumber = {3}/>
					
						<div style = {backgroundstyle}>	

								<div style = {topstyle}>
									<h1> DATA ANALYSIS </h1>
									<h5 style = {{width:"1000px",paddingTop:"10px"}}>Select one or two strands to see a full comparison between either the strand vs itself or the strand and its complement vs another strand. </h5>
								</div>

									
								<div style  = {bottomstyle}>
									<StrandComparison fulllist = {this.state.Full_List} componentlist = {this.state.Component_List} results = {this.state.Results} status = {this.state.programstatus}/>
								</div>
						</div>
				</div>
			</div>

			<FooterSection/>
		</div>
		);
	}
}