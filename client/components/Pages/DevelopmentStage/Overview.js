import React from "react";
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import {FormControl,Form,FormGroup,Col} from 'react-bootstrap'


//STORE
import StrandlistStore from "../../Store/StrandlistStore";

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Overview extends React.Component {
	handleSalt(input)
	{
		if((input.target.value == "Na"|| input.target.value == "Mg")&& (input.target.value != this.props.Salt))
		{
			StrandAction.EditSalt(input.target.value);	
		}
	}
	handleSaltConcentration(input)
	{
		if(input.target.value <=1 && input.target.value > 0 && input.target.value != this.props.Concentration)
		{
			StrandAction.EditSaltConcentration(input.target.value);
		}
	}
	printComponentList()
	{	
		let componentList = "";		
		
		if(this.props.complist.length > 0){
			componentList = this.props.complist[0].name;
			for(let i = 1;i < this.props.complist.length; i++)
			{
				componentList = componentList+" , "+ this.props.complist[i].name;
			}
		}

		return(<h5 style = {{color:"#494e56",fontWeight:"bold"}}>{componentList}</h5>)
	}

	printStrandList()
	{
		return this.props.strandlist.map(function(listValue,index){
			
			let data = listValue.name + " [ "+listValue.componentsdisplay + " ] ";
			let number =  index +"."
			return( 
				<div>
					<span style = {{display:"inline-block",color:"black",fontSize:"9px",paddingRight:"8px"}}>
						{number}
					</span>
					<h5 key = {listValue.name + "-fullstrand"} style = {{color:"#494e56",width:"380px",textOverflow:"ellipsis",display:"inline-block"}}> 
						{data}
					</h5>
				</div>
			)
		})
	}

	render()
	{

		const bodyStyle = {
			background:"rgba(100, 153, 206,0.3)",
			padding:"2px 0px 15px 30px",
			width:"500px",
			margin:"1.5px",
		}
		const headerStyle = {
			 background:"rgba(139, 179, 218,0.7)",
			padding:"15px 0px 15px 30px",
			width:"500px",
			margin:"1.5px",
		}
		const bodyStyle2 = {
			background:"rgba(100, 153, 206,0.3)",
			padding:"2px 0px 15px 30px",
			width:"500px",
			margin:"1.5px",
		}
		const header2Style= {
			 background:"rgba(139, 179, 218,0.7)",
			padding:"15px 0px 15px 30px",
			width:"500px",
			margin:"1.5px",
		}
		const conditionsPosition = {
			display:"inline-block",
			marginRight:"2px"
		}
		const componentPosition = {
			marginTop:"-274px"
		}
		const fullStrandPosition = {
			display:"inline-block",
			verticalAlign:"top"
		}


		return(
			<div style = {{fontFamily:"'Roboto',serif",marginLeft:"17px",color:"white"}}>

				<div className= "animated fadeInUp" style = {conditionsPosition}>
					<h4 style = {header2Style}>  <Glyphicon glyph = "cog"/> Adjust Experimental Conditions: </h4>						
					<div style = {bodyStyle2}>
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



				<div className= "animated fadeInUp" style = {fullStrandPosition}>
					<h4 style = {headerStyle}> <Glyphicon glyph = "tasks"/> Full Strand Overview: </h4>		
					<div style = {bodyStyle}>

						<h5 style = {{fontFamily:"'Anaheim',serif",paddingTop:"5px"}}> 
							Number of Strands: <strong>{this.props.strandlist.length} 
							</strong>
						</h5>

						<h5 style = {{fontFamily:"'Anaheim',serif",paddingTop:"5px"}}> 
							Strands: 
						</h5>

						<div style = {{height:"358px",overflow:"auto",width:"440px",background:"rgba(255, 255, 255, 0.9)",padding:"10px"}}> 
							{this.printStrandList()} 
						</div>			
					</div>
				</div>
		      

					<div className= "animated fadeInUp" style = {componentPosition}>
						<h4 style = {header2Style}> <Glyphicon glyph = "tasks"/> Strand Component Overview: </h4>						
						<div style = {bodyStyle2}>
							<h5 style = {{fontFamily:"'Anaheim',serif",paddingTop:"5px"}}> 
								Number of Components: {this.props.complist.length}
							</h5>
							<h5 style = {{fontFamily:"'Anaheim',serif",paddingTop:"5px"}}> 
								Components: 
							</h5>
							<div style = {{height:"130px",overflow:"auto",width:"440px",background:"rgba(255, 255, 255, 0.9)" ,padding:"10px" }}> 
								{this.printComponentList()} 
							</div>
						</div>
					</div>

			</div>
		)
	}
}