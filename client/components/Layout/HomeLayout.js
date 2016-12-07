import React from "react";
import { Link } from "react-router";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import FooterSection from '../Pages/FooterSection'
import styles from '../../StyleSheet/hover-min.css';
export default class HomeLayout extends React.Component {
	render(){		

		let yoel = {
			height:"550px",width:"400px",float:"left"
		}
		let linkstyle = {
			paddingTop:"3px",color:"white" , background:"rgba(0,0,0,.95)",textAlign:"center",width:"200px",height:"40px",display:"inline-block",fontFamily: "'Raleway', serif " , textDecoration:"none",color:"white",border:"solid",borderColor:"white",borderWidth:"1px",borderRadius:"30px"
		}
//				<div style = {{backgroundImage: "url('http://images.fineartography.jpg')",backgroundSize:"1300px 550px",height:"550px",backgroundPosition:"0px 0px"}}> 
					//								<img style = {{height:"800px",width:"800px"}} src={'https://pbs.twimg.com/profile_images/555358832696635392/fvyL3k4p.jpeg'} alt="YOEL" className="img-responsive"/>

		return(
			<div>
			<div style = {{marginTop:"-20px"}}>
				<h6 style = {{color:"#ff6600", textDecoration:"none",backgroundColor:"#292B2D",height:"40px",padding:"15px 0px 0px 60px",opacity:".9"}}> <Glyphicon glyph = "globe"/> Optimizing Hybridization AnalYsis Of Nucleotides Program </h6>
			
				<div style = {{backgroundColor:"#155151",height:"550px",marginTop:"-20"}}> 
					<img style = {yoel} src={'http://bestanimations.com/Science/Biology/DNA/dna/dna-rna-chromosomes-double-helix-rotating-animated-gif-8.gif'} alt="YOEL" className="img-responsive"/>
	
					<h1 style = {{paddingTop:"8px",paddingTop:"100px",marginLeft:"50%",color:"white"}}> OHAYON PROGRAM </h1>
					<p style = {{paddingTop:"8px",marginLeft:"42%",color:"white"}}> A user-friendly interface for building/sequence strands and analyzing existing sequences.  </p>
				


					<div style = {{margin:"70px 0px 0px 17%",display:"inline-block"}}> 
						<Link className = "hvr-grow" style = {linkstyle} to = "Project/Development">	
						 <h5> Sequencing Project </h5> 
					</Link>  </div> 	

					 <div style = {{marginLeft:"20px",display:"inline-block"}}> <Link className = "hvr-grow"  style = {linkstyle} to = "ToolsAnalysis">
						 <h5 >Tools & Analysis </h5> 

					</Link>	</div>
				</div>

			</div>
			<FooterSection/>
			</div>

		);
	}
}