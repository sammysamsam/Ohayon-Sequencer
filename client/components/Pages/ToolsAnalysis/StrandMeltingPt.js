import React from "react";
import {Input,Button,Row} from 'react-materialize';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

//STORE
import toolsAnalysisStore from "../../Store/toolsAnalysisStore";


export default class StrandMeltingPt extends React.Component {

	constructor()
	{
		super();
		this.getMeltingPoint = this.getMeltingPoint.bind(this);
		this.handleOutput = this.handleOutput.bind(this);
		this.state = {
					output:"" , 
					input:"" , 
					salt:"",
					concentration:"",
					equationNumber:0
				};
	}

////
	componentWillMount() 
	{
		toolsAnalysisStore.on("Update_ToolsAnalysis_MeltingPoint",this.handleOutput);		
	}
	componentWillUnmount() 
	{
		toolsAnalysisStore.removeListener("Update_ToolsAnalysis_MeltingPoint",this.handleOutput);	
	}

/////
	handleOutput()
	{
		this.setState({output:toolsAnalysisStore.get_Melting_Pt()})
	}

	handleInput(input)
	{
		this.setState({input:input.target.value});
	}
	handleSalt(input)
	{
		this.setState({salt:input})
	}
	handleConcentration(input)
	{
		this.setState({concentration:input.target.value})
	}
	equationPicker(input)
	{
		this.setState({equationNumber:input.target.value});
	}

////

	getMeltingPoint()
	{
		if(sequencechecker(this.state.input))
		{

		}
		if(this.state.concentration > 1 || this.state.concentration <= 0)
		{

		}
		//toolsAnalysisStore.
	}

	sequencechecker(e)
	{
		let bases = e.split("");
		let checkpoint = true;
		for(let i = 0 ;i < bases.length;i++)
		{
			if( (bases[i].toUpperCase() != "O") && 
				(bases[i].toUpperCase() != "A") && 
				(bases[i].toUpperCase() != "T") && 	
				(bases[i].toUpperCase() != "C") && 
				(bases[i].toUpperCase() != "G") )
			{
				checkpoint = false;
			}
		}
		return checkpoint;
	}

////


////

	render(){
		let bodyStyle = { 
			width:"1100px",
		    padding:"25px",
		    backgroundColor:"#eceff1"
		}

			return (
				<div style = {bodyStyle}>
					
					<h5>Currently Under Maintenance! </h5>


					<div style = {{width:"750px"}}>
						<Input
							s={12}
							value = {this.state.blueprint} 
							label="Strand Sequence (i.e.) ATCG"
							type = "text"
							onChange = {this.handleInput.bind(this)}
						/>
					</div>

					<div style = {{display:"inline-block"}}>
						<p style = {{fontFamily: "'Anaheim', serif",margin:"0",padding:"0"}}>Select Salt and Concentration:</p>
						<Row>	
			
								<Input 					
									name="salt" 		
									defaultChecked = {true} 
									value="Na"  
									type="radio"
									label = "Na"
									onClick = {this.handleSalt.bind(this)} />
								<Input 					
									name="salt" 		
									defaultChecked = {false} 
									value="Mg"  
									type="radio"
									label = "Mg"
									onClick = {this.handleSalt.bind(this)} 
								/>
						</Row>
						<Input
							label="Concentration [0.0 M - 1.0 M]:"
							type="number"
							onChange={this.handleConcentration.bind(this)} 
							style = {{fontSize:"13px",width:"240px"}} 
						/>
					</div>

					<div style = {{display:"inline-block",verticalAlign:"top"}}>
						<p style = {{fontFamily: "'Anaheim', serif",margin:"0",padding:"0"}}>Select Equation:</p>
						<Input 					
							name="equation" 		
							defaultChecked = {true} 
							value={0}  
							type="radio"
							label = "Equation 1"
							onClick = {this.equationPicker.bind(this)} 
						/>
						<Input 					
							name="equation" 		
							value={1}  
							type="radio"
							label = "Equation 2"
							onClick = {this.equationPicker.bind(this)} 
						/>
					</div>
					<div>
						<Button disabled onClick = {this.getMeltingPoint}>SUBMIT</Button>
					</div>
				</div>

			)
	}
}