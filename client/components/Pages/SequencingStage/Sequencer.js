import React from "react";
import { Button,Icon,Input} from 'react-materialize';
import Spinner from 'react-spinkit';

import ReactCountdownClock from 'react-countdown-clock';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Sequencer extends React.Component {
	constructor()
	{
		super();
		this.activatesequencer = this.activatesequencer.bind(this);
		this.handleTime = this.handleTime.bind(this);
		this.state = {time:15}
	}
	handleTime(input)
	{
		this.setState({time:input.target.value});
	}
	activatesequencer()
	{
		if(this.state.time < 0 || this.state.time > 180)
			Materialize.toast("Unfufilled Requirement: Invalid Time Limit",3000);
		else 
			StrandAction.SequenceStrandlist(this.state.time);
	}
	
	renderSequencerStart()
	{
		let sequencerButtonStyle = {
			height:"50px",
			fontWeight:"bold",
			fontSize:"13px",
			display:"inline-block"
		}
		return(
			<div>
				<div style = {{display:"inline-block",marginRight:"120px"}}>
					<Button style = {sequencerButtonStyle}  onClick = {this.activatesequencer}> 
						<i style = {{position:"relative",top:"2px",marginRight:"10px"}}className="material-icons">cloud_upload</i> 
						Sequence Strands 
					</Button>
				</div>

				<div style = {{display:"inline-block",width:"300px"}}>
					<Input
						label = "Algorithm Runtime (min.)"
						s = {6}
						defaultValue = {this.state.time}
						style = {{color:"white"}}
						type = "number"
						min = "10"
						max = "240"
						className="validate"
						onChange = {this.handleTime} 
						>
						<Icon>av_timer</Icon> 
					</Input>
				</div>

			</div>
			)
	}
	renderSequencerRunning()
	{
		return (
			<div>
				<div style = {{	height:"50px", width:"250px",marginTop:"-8px",marginLeft:"250px"}}>
					<Spinner spinnerName='cube-grid' noFadeIn />
				</div>
				<div style = {{position:"relative",top:"-270px",left:"360px"}}>
					<ReactCountdownClock seconds={60 * this.state.time}
	                 color="#ff7043"
	                 alpha={0.9}
	                 size={110}
	                 />
				</div>				
			</div>
			)
	}
	render()
	{
		let errorStyle = { 
			padding:"17px",
			borderStyle:"solid",
			background:"rgba(139, 179, 218,0.2)",
			borderColor:"#ff9e80",
			borderWidth:"thin",
			width:"700px",
			color:"#ff9e80",
			textAlign:"center",
			fontWeight:"bold",
			fontSize:"14px",
			borderRadius:"2px"
		}

		var checkpoint = this.props.status;
		if(this.props.componentlength == 0){
			return (
				<div style = {errorStyle} >  
					<i style = {{position:"relative",top:"6px",marginRight:"15px"}}className="material-icons">error</i> 
					Unfulfilled Requirement: Must have at least one or more Strand Components 
				</div>)
		}
		switch(checkpoint)
		{
			case true:{ 
				return 	this.renderSequencerRunning();
			}
			case false:{ 
				return  this.renderSequencerStart();
			}
		}
	}
}