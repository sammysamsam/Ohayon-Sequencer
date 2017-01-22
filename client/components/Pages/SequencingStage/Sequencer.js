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
		this.state = {time:5}
	}
	handleTime(input)
	{
		this.setState({time:input.target.value});
	}
	activatesequencer()
	{
		if(this.state.time < 0 || this.state.time > 60)
			Materialize.toast("Unfufilled Requirement: Invalid Time Limit",3000);
		else 
			StrandAction.SequenceStrandlist(this.state.time);
	}
	renderInactiveSequencerStart()
	{
		let sequencerButtonStyle = {
			height:"50px",
			fontWeight:"bold",
			fontSize:"13px",
			display:"inline-block"
		}
		let containerStyle = {
			background:"rgba(0, 0, 0,0.1)",
			margin:"30px 75px 0px 75px",
			padding:"50px 0px 50px 100px"
		}
		let statusStyle = { 
			margin:"-10px 75px 0px 75px",
			padding:"22px",
			background:"rgba(0, 0, 0,0.1)",
			color:"#e6e6e6",
			textAlign:"center",
			fontWeight:"bold",
			fontSize:"14px",
		}
		return(
			<div>
				<div style = {statusStyle} >  
					<i style = {{position:"relative",top:"6px",marginRight:"15px",color:"#ff4d4d"}}className="material-icons">error</i> 
					Unfufilled Requirement: project must contain at least one strand component
				</div>				
				<div style = {containerStyle}>

					<div style = {{display:"inline-block",marginRight:"150px"}}>
						<Button style = {sequencerButtonStyle}  onClick = {this.activatesequencer} disabled > 
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
							disabled
							>
							<Icon>av_timer</Icon> 
						</Input>
					</div>
				</div>

			</div>
			)
	}
	renderSequencerStart()
	{
		let statusStyle = { 
			margin:"0px 75px 0px 75px",
			padding:"22px",
			background:"rgba(139, 179, 218,0.1)",
			color:"white",
			textAlign:"center",
			fontWeight:"bold",
			fontSize:"14px",
		}
		let containerStyle = {
			background:"rgba(139, 179, 218,0.15)",
			margin:"50px 75px 0px 75px",
			padding:"50px 0px 50px 100px"
		}
		let sequencerButtonStyle = {
			height:"50px",
			fontWeight:"bold",
			fontSize:"15px",
			display:"inline-block"
		}
		let loadprompt = () =>{
            if(this.props.prompt == "success")
                return(
                    <div style = {statusStyle} >  
                        <i style = {{position:"relative",top:"6px",marginRight:"15px",color:"#ff661a"}}className="material-icons">check_circle</i> 
                        Success! Go to Results to view sequences.
                    </div>)
             else if(this.props.prompt == "fail")
				return(				
				<div style = {statusStyle} >  
					<i style = {{position:"relative",top:"6px",marginRight:"15px",color:"#ff661a"}}className="material-icons">offline_pin</i> 
					Previous Sequencing Attempt Unsucessful (Ready To Sequence)
				</div>)
			else
				return(	
				<div style = {statusStyle} >  
					<i style = {{position:"relative",top:"6px",marginRight:"15px",color:"#42f448"}}className="material-icons">check_circle</i> 
					Ready To Sequence
				</div>)
		}

		return(
			<div>
				{loadprompt()}
				<div style = {containerStyle}>
					<div style = {{display:"inline-block",marginRight:"150px"}}>
						<Button style = {sequencerButtonStyle}  onClick = {this.activatesequencer}  > 
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
							min = "1"
							max = "120"
							className="validate"
							onChange = {this.handleTime} 
							>
							<Icon>av_timer</Icon> 
						</Input>
					</div>
				</div>
			</div>
			)
	}


	renderSequencerRunning()
	{
		let statusStyle = {
			width:"235px",
			marginLeft:"-70px",
			marginTop:"20px",
			paddingTop:"5px",
			paddingLeft:"35px",
			color:"#ffccbc",
			background:"rgba(139, 179, 218,0.1)",
			height:"35px",
			borderRadius:"4px"
		}
		let d = new Date();
		let timeLeft = this.props.time - d.getTime(); 
		return (
			<div>
				<div style = {{position:"relative",top:"-360px",left:"870px"}}>
					<ReactCountdownClock seconds={timeLeft/1000}
	                 color="#ff7043"
	                 alpha={0.9}
	                 size={110}
	                 />
				</div>	
				<div style = {{	height:"50px", marginLeft:"450px"}}>
					<Spinner spinnerName='cube-grid' noFadeIn />
					<div style = {statusStyle}> Optimizing Sequences...</div>
				</div>
			
			</div>
			)
	}


	render()
	{
		var checkpoint = this.props.status;
		if(this.props.componentlength == 0){
			return (
			<div>
				{this.renderInactiveSequencerStart()}
			</div>
		)
		}
		switch(checkpoint)
		{
			case true:{ 
				return this.renderSequencerRunning();
			}
			case false:{ 
				return  this.renderSequencerStart();
			}
		}
	}
}
