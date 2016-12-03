import React from "react";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from '../../../StyleSheet/hover-min.css';
import { FormControl,Form,FormGroup,Button, Checkbox } from 'react-bootstrap';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

//STORE
import StrandlistStore from "../../Store/StrandlistStore";


export default class StrandComparer extends React.Component {

	constructor()
	{
		super();
		this.state = {
			windowstatus:"false",
			output:StrandlistStore.getToolsAnalysisResults() , 
			name1:"",
			sequence1:"",
			fiveprime1:"true",
			name2:"",
			sequence2:"",
			fiveprime2:"false"
		}
		this.updateresults = this.updateresults.bind(this)
	}
	componentWillMount() 
	{
		StrandlistStore.on("Update_ToolsAnalysisResults",this.updateresults);		
	}
	componentWillUnmount() 
	{
		StrandlistStore.removeListener("Update_ToolsAnalysisResults",this.updateresults);	
	}
	//
	updateresults()
	{
		this.setState({ output:StrandlistStore.getToolsAnalysisResults()	});
	}
	//


	sequencechecker(e)
	{
		let bases = e.split("");
		let checkpoint = true;
		for(let i = 0 ;i < bases.length;i++)
		{
			if( (bases[i].toUpperCase() != "A") && 
				(bases[i].toUpperCase() != "T") && 	
				(bases[i].toUpperCase() != "C") && 
				(bases[i].toUpperCase() != "G")){
				checkpoint = false;
			}
		}
		return checkpoint;
	}

	mismatchfunction()
	{
		let check1 = this.sequencechecker(this.state.sequence1);
		if(check1 == false)
		{
			alert("Error: Sequence of Strand 1 contains non A T C or G characters");
			return;
		}
		let check2 = this.sequencechecker(this.state.sequence2);
		if(check2 == false)
		{
			alert("Error: Sequence of Strand 2 contains non A T C or G characters")
			return;
		}

		let seq1 = this.state.sequence1;
		if(this.state.fiveprime1 == 'false')
		{
			seq1 = this.state.sequence1.split("").reverse().join("");
		}
		let loop1 = false;
		if(this.state.fiveprime1 == "loop")
		{
			let loop1 = true;
		}


		let seq2 = this.state.sequence2;
		if(this.state.fiveprime2 == 'true')
		{
			seq2 = this.state.sequence2.split("").reverse().join("");
		}
		let loop2 = false;
		if(this.state.fiveprime2 == 'loop')
		{
			loop2 = true;
		}


		let strandlist = [this.state.name1,seq1,loop1,this.state.name2,seq2,loop2]
		StrandAction.CompareStrandsTA(strandlist);
	}



	//

	handlename(e)
	{
		this.setState({ name1:e.target.value});
	}
	handlename2(e)
	{
		this.setState({ name2:e.target.value});	
	}
	handleinput(e)
	{
		e = e.target.value;
		this.setState({sequence1:e});	
		}
	handleinput2(e)
	{
		e = e.target.value;
		this.setState({sequence2:e});	
	}
	handleprime(f)
	{
		if(f.target.value == 1)
		{
			this.state.fiveprime1 = "true";
		}
		else if(f.target.value == 2)
		{
			this.state.fiveprime1 = "false";
		}
		else if(f.target.value == 3)
		{
			this.state.fiveprime1 = "loop";
		}
		else if(f.target.value == 3)
		{
			this.state.fiveprime2 = "true";
		}
		else if(f.target.value == 4)
		{
			this.state.fiveprime2 = "false";
		}
		else if(f.target.value == 5)
		{
			this.state.fiveprime2 = "loop";
		}
	}


	//
	openwindow()
	{
		this.setState({windowstatus:"true"})
	}
	closewindow()
	{
		this.setState({windowstatus:"false"})
	}



	loadcomparescreen()
	{
		let resultstyle = {
	  		overflow:"scroll",
	  		fontFamily:"'Share Tech Mono',serif", 
	  		padding:"10px 25px 0px 25px",
	  		whiteSpace:"pre",
	  		width:"900px",
	  		color:"black"
		}
		if(!this.state.output == "")
		{
			let result = this.state.output.split("*");
			let shiftedarrays = result[2].split("$$$");
			return  (
				<div style = {resultstyle}> 
					<h4 style = {{textDecoration:"underline",marginBottom:"10px"}}>
						Best Arrangement
					</h4>
					<h5>
						{result[1]}
					</h5>
		 			<h4 style = {{textDecoration:"underline",marginTop:"30px"}}>
		 				All Arrangements
		 			</h4>
					
					{shiftedarrays.map(function(listValue,index){	
						return( 
							<h6 key = {index} style = {{height:"50px",marginTop:"40px"}}> 
								listValue}
							</h6>	
						)
					})}			
				</div>
				)
		}
		return;
	}

	loadbottom(){
		let containstyle = { 

			width:"1100px",
			margin:"0px 0px 15px 1px",
			background:"rgba(31, 64, 96,0.9)",
			color:"white",
			padding:"10px"
		}
		let labelstyle = {
			display:"inline-block",
			margin:"11px 0px 0px 20px",
			fontFamily: "'Anaheim', serif " , 
			width:"500px",
			marginRight:"5px"
		}
		if(this.state.windowstatus == "true"){
			return (
				<div style = {containstyle}>
					
					<div style = {labelstyle}> 
						<div style = {{ display:"inline-block"}}>
							<h5 style = {{fontFamily: "'Dosis', serif " ,  height:"35px"}}>	
								Strand 1 Name:	
							</h5>	
							<FormControl 
								placeholder="Name (Default: A)" 
								type = "text" 
								style = {{width:"760px",marginTop:"-20px",color:"black",fontSize:"15px",fontFamily: "'Anaheim', serif ",height:"50px",width:"250px"}}  
								onChange = {this.handlename.bind(this)}
							/>
						</div>

						<div style = {{display:"inline-block",height:"50px",padding:"10px 0px 0px 0px"}}>
							<span>Select Direction: </span>
							
							<label style = {{marginLeft:"10px"}} >
								<input style = {{marginRight:"10px"}} name="dnadirection" value = {1} defaultChecked = {true} type="radio"  onClick = {this.handleprime.bind(this)} /> 
								5' - 3' 
							</label>
							<label style = {{marginLeft:"10px"}} >
								<input style = {{marginRight:"10px"}} name="dnadirection" value = {2} defaultChecked = {false} type="radio"  onClick = {this.handleprime.bind(this)} /> 
								3' - 5' 
							</label>
							<label style = {{marginLeft:"10px"}} > 
								<input style = {{marginRight:"10px"}} name="dnadirection" value = {3} defaultChecked = {false}  type="radio"  onClick = {this.handleprime.bind(this)} /> 
								Loop 
							</label>						
						</div>

						<h5 style = {{	fontFamily: "'Dosis', serif " ,  height:"35px"}}>	Insert Strand Sequence:	</h5>
							<FormControl 
								type = "text"
								placeholder="(i.e.) ATCG" 
								style = {{width:"460px",marginTop:"-20px",color:"black",fontSize:"15px",fontFamily: "'Anaheim', serif ",height:"50px"}}  
								onChange = {this.handleinput.bind(this)}
							/>
					</div>
					
					<div style = {labelstyle}> 
						<div style = {{ display:"inline-block"}} >
							<h5 style = {{fontFamily: "'Dosis', serif " ,  height:"35px"}}>	Strand 2 Name	</h5>
								<FormControl 
									placeholder="Name (Default: B)" 
									type = "text" style = {{width:"760px",marginTop:"-20px",color:"black",fontSize:"15px",fontFamily: "'Anaheim', serif ",height:"50px",width:"250px"}}  
									onChange = {this.handlename2.bind(this)}
								/>
						</div>

						<div style = {{display:"inline-block",height:"50px", padding:"10px 0px 0px 0px"}}>
							<span>Select Direction: </span>
							
							<label style = {{marginLeft:"10px"}} > 
								<input style = {{marginRight:"10px"}} name="dnadirection2" value = {4} defaultChecked = {false} type="radio"  onClick = {this.handleprime.bind(this)} /> 
								5' - 3' 
							</label>
							<label style = {{marginLeft:"10px"}} > 
								<input style = {{marginRight:"10px"}} name="dnadirection2" value = {5} defaultChecked = {true}  type="radio"  onClick = {this.handleprime.bind(this)} /> 
								3' - 5' 
							</label>
							<label style = {{marginLeft:"10px"}} > 
								<input style = {{marginRight:"10px"}} name="dnadirection2" value = {6} defaultChecked = {false}  type="radio"  onClick = {this.handleprime.bind(this)} /> 
								Loop 
							</label>

						</div>

						<h5 style = {{	fontFamily: "'Dosis', serif " ,  height:"35px"}}>	
							Insert Strand Sequence:	
						</h5>
						<FormControl 
							type = "text" 
							placeholder="(i.e.) ATCG" 
							style = {{width:"460px",marginTop:"-20px",color:"black",fontSize:"15px",fontFamily: "'Anaheim', serif ",height:"50px"}}  
							onChange = {this.handleinput2.bind(this)}
						/>
					</div>


					<div  
						className = "hvr-grow" 
						style = {{borderRadius:"25px",fontSize:"15px",padding:"3px 0px 0px 45px",width:"140px",height:"40px",background:"rgba(64, 128, 191,.6)",marginTop:"20px",marginLeft:"450px"}} 
						onClick = {this.mismatchfunction.bind(this)}> 
						
						<h5>Submit</h5>

					</div>
				
					<h5 style = {{	fontFamily: "'Dosis', serif " ,  height:"39px",padding:"10px"}}> Output: </h5>

					<div style = {{marginLeft:"10px", height:"370px",width:"1050px",background:"rgba(217, 230, 242,.95)",overflowY:"scroll",overflowX:"scroll"}}> 
						{this.loadcomparescreen()} 
					</div>

				</div>)
		}
	}
		
	render(){
		let titlestyle = {
			width:"1100px",
			height:"50px",
			padding:"15px 10px 5px 40px",
			color:"white",
			fontFamily: "'Anaheim', serif ",
			background:"rgba(57, 115, 172,0.7)",
			margin:"1px"
		}


		return(		 
			<div>				
				<h4 style = {titlestyle}>	
					<Glyphicon style = {{marginRight:"10px"}} glyph = "stats"/> 
					Strand vs Strand Base Paring    
					<Glyphicon 
						className = "hvr-grow"  
						style = {{cursor:"pointer",fontSize:"12px", marginTop:"4px",marginLeft:"10px",float:"right"}} 
						onClick = {this.openwindow.bind(this)} glyph = "resize-full"/> 
					<Glyphicon 
						className = "hvr-grow"  
						style = {{cursor:"pointer",fontSize:"12px",marginTop:"4px",float:"right"}} 
						onClick = {this.closewindow.bind(this)} 
						glyph = "minus"/> 
				</h4>
				
				{this.loadbottom()}
			</div>
		);
	}
}