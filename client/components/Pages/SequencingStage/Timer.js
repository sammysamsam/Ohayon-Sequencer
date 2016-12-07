import React from "react";
import { Button } from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Spinner from 'react-spinkit'
//STORE
import StrandlistStore from "../../Store/StrandlistStore";

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Sequencer extends React.Component {


	ComponentDisplay()
	{
		const loadButtonStyle = {
			height:"50px",
			width:"250px",
			fontWeight:"bold",
			marginTop:"-12px",
			marginLeft:"80px"
		}
		const sequencerButtonStyle = {
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
		switch(checkpoint)
		{
			case true:{ 
				return 	 (<div style = {loadButtonStyle}>


				</div>)

			}
			case false:{ 
				return  (
				<div>
					<Button style = {sequencerButtonStyle}  className = "hvr-forward" onClick = {this.activatesequencer}>
						<Glyphicon glyph = "flash"/>  
						Sequence Strands
					</Button>
				</div>
				 )
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