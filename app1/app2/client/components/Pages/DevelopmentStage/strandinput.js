import React from "react";
import Stranddisplay from "./stranddisplay";
//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Strandinput extends React.Component {

		constructor(){
			super();
			this.state = { name: "", strandlength: "default (10)", complement: "true",mismatchlimit: "default (5)", hairpinlimit: "default (5)", blueprint: "o-o-o-o-o-o-o-o-o-o-o"};
		}

		handlename(e){
			this.setState({name : e.target.value});
		}
		handlelength(e){
			const strandlength = e.target.value;
			if (strandlength == parseInt(strandlength, 10)){
				this.setState({strandlength});
				var tempblueprint = "o";
				for (var i = 1; i < strandlength; i ++){
					tempblueprint = tempblueprint + "-o";
				}
				this.setState({blueprint:tempblueprint});
			}
			if(strandlength == ""){
				this.setState({strandlength:"default (10)"});
				this.setState({blueprint:"o-o-o-o-o-o-o-o-o-o-o"});
			}
		}
		handlemismatchlimit(e){
			if (e.target.value == parseInt(mismatchlimit, 10)){
				this.setState({mismatchlimit:e.target.value});
			}
			if(e == ""){
				this.setState({mismatchlimit:"default (5)"});
			}
		}
		handlehairpinlimit(e){
			if (e.target.value == parseInt(hairpinlimit, 10)){
				this.setState({hairpinlimit:e.target.value});
			}		
			if(hairpinlimit == ""){;
				this.setState({hairpinlimit:"default (5)"});
			}		
		}		
		handleblueprint(e){
			const blueprint = e.target.value;
			let splitblueprint = blueprint.split("-");
			if(splitblueprint.length == strandlength){
				this.setState({blueprint});
			}
		}

		tokenprocessor(){
			var strandlength = this.state.strandlength;
			if(this.state.strandlength == "default (10)"){
				strandlength = 10;
			}
			var mismatchlimit = this.state.mismatchlimit;
			if(this.state.mismatchlimit == "default (5)"){
				mismatchlimit = 5;
			}
			var hairpinlimit = this.state.hairpinlimit;
			if(this.state.hairpinlimit == "default (5)"){
				hairpinlimit = 5;
			}
			var returnthis = {name: this.state.name , length: strandlength, complement: this.state.complement, mismatch: mismatchlimit, hairpin: hairpinlimit, blueprint: this.state.blueprint};
			console.log(mismatchlimit + '  ' + hairpinlimit);
			// ACTION
			StrandAction.AddStrandList(returnthis);
			//
		}
		render(){
			const inputcontainerstyle = {
				width:"235px",height:"275px", backgroundColor:"#ffa366", paddingLeft:"20px",margin:"30px 0px 0px 100px"
			}
			const titlestyle = {
				fontFamily: "'Dosis', serif " , fontSize:"17px", textAlign:"center"
			}
			const labelstyle = {
				fontFamily: "'Dosis', serif " , fontSize:"15px",
			}
			const inputstyle = {
				fontFamily: "'Dosis', serif " , fontSize:"12px"
			}
			return(			
			<div style = {inputcontainerstyle}>				
				<div style = {titlestyle}> New Strand Input: </div>
				<div style = {inputstyle}> Name: {this.state.strandname} </div>
				
				<input style = {inputstyle} onChange = {this.handlename.bind(this)} />
				<div style = {labelstyle}> Length: {this.state.strandlength} </div>
				
				<input style = {inputstyle} onChange = {this.handlelength.bind(this)} />
				<div style = {labelstyle}> Mismatch Limit: {this.state.mismatchlimit} </div>
				
				<input style = {inputstyle} onChange = {this.handlemismatchlimit.bind(this)} />
				<div style = {labelstyle}> Self Mismatch Limit: {this.state.hairpinlimit} </div>
				
				<input style = {inputstyle} onChange = {this.handlehairpinlimit.bind(this)} />
				<div style = {labelstyle}>  Blueprint: {this.state.blueprint} </div>
				
				<input style = {inputstyle} onChange = {this.handleblueprint.bind(this)} />
				<button onClick = {this.tokenprocessor.bind(this)}> submit </button>
			</div>
			);
		}
}