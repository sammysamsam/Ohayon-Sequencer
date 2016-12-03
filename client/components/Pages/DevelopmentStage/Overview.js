import React from "react";
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import {FormControl,Form,FormGroup,Col} from 'react-bootstrap'
//STORE
import StrandlistStore from "../../Store/StrandlistStore";

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Overview extends React.Component {
	handleSalt(e)
	{
		if((e.target.value == "Na"|| e.target.value == "Mg")&& (e.target.value != this.props.Salt))
		{
			StrandAction.EditSalt(e.target.value);	
		}
	}
	handleSaltConcentration(e)
	{
		if(e.target.value <=1 && e.target.value > 0 && e.target.value != this.props.Concentration)
		{
			StrandAction.EditSaltConcentration(e.target.value);
		}
	}
	printcomplist()
	{	
		let complistprint = "";		
		
		if(this.props.complist.length > 0){
			complistprint = this.props.complist[0].name;
			for(let i = 1;i < this.props.complist.length; i++)
			{
				complistprint = complistprint+" , "+ this.props.complist[i].name;
			}
		}

		return(<h4 style = {{color:"black",fontWeight:"bold"}}>{complistprint}</h4>)
	}
	printstrandlist()
	{
		return this.props.strandlist.map(function(listValue,index){
			let data = listValue.name + " [ "+listValue.componentsdisplay + " ] ";
			let indexx =  index +"."
			return( 
				<div>
					<span style = {{display:"inline-block",color:"black",fontSize:"9px",paddingRight:"8px"}}>
						{indexx}
					</span>
					<h4 key = {listValue.name + "-fullstrand"} style = {{color:"black",width:"380px",textOverflow:"ellipsis",display:"inline-block"}}> 
						{data}
					</h4>
				</div>
			)
		})
	}


	render()
	{

		const containstyle = {
			background:"rgba(31, 64, 96,0.9)",
			padding:"2px 0px 15px 30px",
			width:"500px",
			margin:"1.5px",
		}
		const topstyle = {
			background:"rgba(57, 115, 172,0.7)",
			padding:"15px 0px 15px 30px",
			width:"500px",
			margin:"1.5px",
		}
		const contain2style = {
			background:"rgba(31, 64, 96,0.9)",
			padding:"2px 0px 15px 30px",
			width:"500px",
			margin:"1.5px",
		}
		const top2style= {
			background:"rgba(57, 115, 172,0.7)",
			padding:"15px 0px 15px 30px",
			width:"500px",
			margin:"1.5px",
		}
		const conditionsposition = {
			display:"inline-block",
			marginRight:"2px"
		}
		const componentposition = {
			marginTop:"-274px"
		}
		const fullstrandposition = {
			display:"inline-block",
			verticalAlign:"top"
		}


		return(
			<div style = {{fontFamily:"'Dosis',serif",marginLeft:"17px",color:"white"}}>

				<div style = {conditionsposition}>
					<h4 style = {top2style}>  <Glyphicon glyph = "cog"/> Adjust Experimental Conditions: </h4>						
					<div style = {contain2style}>
						<h5 style = {{fontFamily:"'Anaheim',serif",textAlign:"center"}}> 
							Current Conditions: {this.props.Salt} [{this.props.Concentration}] 
						</h5>
						
						<hr style = {{backgroundColor:"white",width:"220px"}}/>		
							<h5>Salt (Na or Mg):    
							<FormControl 
								type="text" 
								placeholder="Enter Salt Here" 
								onChange={this.handleSalt} 
								style = {{marginLeft:"10px",color:"black",fontSize:"14px",fontFamily: "'Anaheim', serif ",width:"200px",display:"inline"}} 
							/>
						</h5>
						
						<h5>Concentration of Salt: 
							<FormControl 
							type="text" 
							placeholder="Enter Concentration Here" 
							onChange={this.handleSaltConcentration.bind(this)} 
							style = {{marginLeft:"10px",color:"black",fontSize:"14px",fontFamily: "'Anaheim', serif ",width:"200px",display:"inline"}} 
							/>
						</h5>
					</div>
				</div>



				<div style = {fullstrandposition}>
					<h4 style = {topstyle}> <Glyphicon glyph = "tasks"/> Full Strand Overview: </h4>		

					<div style = {containstyle}>

						<h5 style = {{fontFamily:"'Anaheim',serif",paddingTop:"5px"}}> 
							Number of Strands: <strong>{this.props.strandlist.length} 
							</strong>
						</h5>

						<h5 style = {{fontFamily:"'Anaheim',serif",paddingTop:"5px"}}> 
							Strands: 
						</h5>

						<div style = {{height:"358px",overflow:"auto",width:"440px",background:"rgba(255, 255, 255, 0.9)",padding:"10px" }}> 
							{this.printstrandlist()} 
						</div>			
					</div>
				</div>

				<div style = {componentposition}>
					<h4 style = {top2style}> <Glyphicon glyph = "tasks"/> Strand Component Overview: </h4>						
					
					<div style = {contain2style}>
						<h5 style = {{fontFamily:"'Anaheim',serif",paddingTop:"5px"}}> 
							Number of Components: {this.props.complist.length}
						</h5>
						<h5 style = {{fontFamily:"'Anaheim',serif",paddingTop:"5px"}}> 
							Components: 
						</h5>
						<div style = {{height:"130px",overflow:"auto",width:"440px",background:"rgba(255, 255, 255, 0.9)" ,padding:"10px" }}> 
							{this.printcomplist()} 
						</div>
					</div>
				</div>
			</div>
		)
	}
}