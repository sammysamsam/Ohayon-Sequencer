import React from "react";
import { Button,Input } from 'react-materialize';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";



export default class Timer extends React.Component {

	updateTimeLimit(input)
	{

	}

	ComponentDisplay()
	{

	}
	_handleKeyPress(input) 
	{
		if (input.key == 'Enter') 
		{
			this.updateTimeLimit();
		}
	}
	render()
	{
		let containerStyle = {
			display:"inline-block",
			width:"300px",
			marginLeft:"100px"
		}


		switch(this.props.status)
		{
			case true:{ 
				return 	 (
					<div style = {containerStyle }>
					</div>
				)
			}
			case false:{ 
				return  (
					<div style = {containerStyle}>
						
						<Input
						label = "Algorithm Runtime (min.)"
						s = {6}
						defaultValue = "15"
						style = {{color:"white"}}
						type = "number"
						min = "10"
						max = "240"
						className="validate"
						onKeyPress={this._handleKeyPress.bind(this)} 
						onChange = {this.updateTimeLimit.bind(this)} 
						>
						<Icon>av_timer</Icon> 
						</Input>
					</div>
				 )
			}
		}
	}
}