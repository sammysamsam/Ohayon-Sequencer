import React from "react";
import { Button } from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Spinner from 'react-spinkit'
//STORE
import StrandlistStore from "../../Store/StrandlistStore";

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Sequencer extends React.Component {


	activatesequencer()
	{
		StrandAction.SequenceStrandlist();
	}

	ComponentDisplay()
	{
		const loadbuttonstyle = {
			height:"50px",
			width:"250px",
			fontWeight:"bold",
			marginTop:"-12px",
			marginLeft:"80px"
		}
		const seqbuttonstyle = {
			border:"solid",
			borderColor:"#ff751a",
			background:"rgba(255, 102, 0,.7)",
			
			height:"50px",
			width:"200px",
			fontWeight:"bold",
			borderRadius:"9px",
			fontSize:"11px",
			marginTop:"2px"
		}
		var checkpoint = this.props.status;
		if(this.props.componentlength == 0){
			return (
				<div style = {{ paddingTop:"15px",height:"50px",width:"400px", marginLeft:"-80px",fontWeight:"bold",color:"white"}}  onClick = {this.activatesequencer}> 
					<Glyphicon glyph = "exclamation-sign"/>  
					Unfufilled Requirement: At least One Strand Component 
				</div>)
		}
		switch(checkpoint)
		{
			case true:{ 
				return 	 (<div style = {loadbuttonstyle}><Spinner spinnerName='cube-grid' noFadeIn /></div>)

			}
			case false:{ 
				return  <Button style = {seqbuttonstyle}  className = "hvr-pulse" onClick = {this.activatesequencer}> <Glyphicon glyph = "flash"/>  SEQUENCE DNA </Button>
			}
		}
	}

	render()
	{
		return(			
		<div >
			{this.ComponentDisplay()}
		</div>
		)
	}
}