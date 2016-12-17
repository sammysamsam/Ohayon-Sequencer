import React from "react";
import {Input,Button,Row,Table} from 'react-materialize';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

//STORE
import toolsAnalysisStore from "../../Store/toolsAnalysisStore";


export default class StrandComparer extends React.Component {

	constructor()
	{
		super();
		this.state = {
			output:toolsAnalysisStore.get_Compare_Results() , 
			name1:"",
			sequence1:"",
			fiveprime1:"true",
			name2:"",
			sequence2:"",
			fiveprime2:"false"
		}
		this.updateresults = this.updateresults.bind(this);
	}
	componentWillMount() 
	{
		toolsAnalysisStore.on("Update_ToolsAnalysis_Compare",this.updateresults);		
	}
	componentWillUnmount() 
	{
		toolsAnalysisStore.removeListener("Update_ToolsAnalysis_Compare",this.updateresults);	
	}
	//
	updateresults()
	{
		this.setState({ output:toolsAnalysisStore.get_Compare_Results()	});
	}
	//


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
		this.setState({sequence1:e.target.value});	
	}
	handleinput2(e)
	{
		this.setState({sequence2:e.target.value});	
	}
	handleprime(f)
	{
		if(f.target.value == 1)
			this.state.fiveprime1 = "true";
		else if(f.target.value == 2)
			this.state.fiveprime1 = "false";
		else if(f.target.value == 3)
			this.state.fiveprime1 = "loop";
		else if(f.target.value == 4)
			this.state.fiveprime2 = "true";
		else if(f.target.value == 5)
			this.state.fiveprime2 = "false";
		else if(f.target.value == 6)
			this.state.fiveprime2 = "loop";
	}

	clear()
	{
		this.setState({
			name1:"",
			sequence1:"",
			fiveprime1:"true",
			name2:"",
			sequence2:"",
			fiveprime2:"false"			
		});
	}

	sequencechecker(e, name )
	{
		let bases = e.split("");
		let checkpoint = true;
		for(let i = 0 ;i < bases.length;i++)
		{
			if( (bases[i].toUpperCase() != "O") && 
				(bases[i].toUpperCase() != "A") && 
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
		if(this.state.sequence1 == "" || this.state.sequence2 == "" )
			Materialize.toast("Unfulfilled Requirement: Both strand sequences must have at least one base",3000);
		if(this.sequencechecker(this.state.sequence1) == false)
			Materialize.toast("Unfulfilled Requirement: Sequence of strand 1  o A T C or G characters",3000);

		if(this.sequencechecker(this.state.sequence2) == false)
			Materialize.toast("Unfulfilled Requirement: Sequence of strand 2 contains o A T C or G characters",3000);

		let seq1 = this.state.sequence1;
		if(this.state.fiveprime1 == 'false')
			seq1 = this.state.sequence1.split("").reverse().join("");

		let loop1 = false;
		if(this.state.fiveprime1 == "loop")
			loop1 = true;

		let seq2 = this.state.sequence2;
		if(this.state.fiveprime2 == 'true')
			seq2 = this.state.sequence2.split("").reverse().join("");

		let loop2 = false;
		if(this.state.fiveprime2 == 'loop')
			loop2 = true;

		let strandlist = [this.state.name1,seq1,loop1,this.state.name2,seq2,loop2]
		StrandAction.CompareStrandsTA(strandlist);
	}


	loadcomparescreen()
	{
		let resultstyle = {
	  		overflow:"scroll",
	  		fontFamily:"'Share Tech Mono',serif", 
	  		whiteSpace:"pre",
	  		width:"1100px",
		}
		let bestarrangementstyle = {
    		background:"rgba(255,255,255,.5)",
    		height:"170px",
    		padding:"15px",
    	}
    	let allarrangementstyle = {
     		height:"678px",
     		padding:"4px",
     		overflow:"scroll"		
    	}
    	let allarrangementitemstyle = {
    		display: "inline-block",
    		marginLeft: "50%",
    		transform: "translate(-50%, 0%)",
    		height:"50px",
    		marginTop:"15px",
    		marginBottom:"20px",
    		display:"inline-block"
    	}
    	let bestarrangementitemstyle = {
    		display: "inline-block",
    		marginLeft: "50%",
    		transform: "translate(-50%, 0%)"
    	}

		if(!(this.state.output[0] == ""))
		{
			let shiftedarrays = this.state.output[1].split("$$$");
			return  (
				<div style = {resultstyle}> 
					<div style = {bestarrangementstyle}>
						<h5 style = {{textDecoration:"underline",textAlign:"center"}}>
							Best Arrangement
						</h5>
						<div style = {bestarrangementitemstyle}>
							{this.state.output[0]}
						</div>
					</div>

		 			<div style = {allarrangementstyle}>
						<Table className = "responsive-table hover">
					        <thead>
					          <tr>
					              <th data-field="id">All Arrangements</th>
					          </tr>
					        </thead>
						    <tbody>
								{shiftedarrays.map(function(listValue,index){	
										return (<tr key = {index} >
											      <td>{listValue} </td>
											    </tr>)
								})}
				        	</tbody>
				      	</Table>
					</div>
				</div>
				)
		}
	}
	
	_handleKeyPress(input) 
	{
		if (input.key == 'Enter') 
		{
			this.mismatchfunction();
		}
	}

	loadbottom(){
		let bodyStyle = { 
			width:"1104px",
			margin:"0px 0px 15px 1px",
			padding:"0px 10px 10px 10px",
			backgroundColor:"#eceff1"
		}
		let labelStyle = {
			display:"inline-block",
			margin:"10px 0px 0px 20px",
			width:"500px",
			marginRight:"5px",
			verticalAlign:"top"
		}
			return (
				<div style = {bodyStyle}>
					<p style = {{color:"#9e9e9e",textAlign:"center"}}> [ Tip: Add 'o' as a non pairing base ] </p>
					<div style = {labelStyle}> 
						<Input
							label="Name (Default: A)" 
							type = "text" 
							 s={12}
							className = "validate"
							onChange = {this.handlename.bind(this)}
						/>

						<Input 					
							name="dnadirection" 		
							defaultChecked = {(this.state.fiveprime1 == "true")}  
							value={1}  
							type="radio"
							label = "5' to 3'"
							onClick = {this.handleprime.bind(this)}
						/>
						<Input 					
							name="dnadirection" 		
							defaultChecked = {(this.state.fiveprime1  == "false")}  
							value={2}  
							type="radio"
							label = "3' to 5'"
							onClick = {this.handleprime.bind(this)}
						/>
						<Input 					
							name="dnadirection" 		
							defaultChecked = {(this.state.fiveprime1 == "loop")}  
							value={3}  
							type="radio"
							label = "Loop DNA"
							onClick = {this.handleprime.bind(this)}
						/>			

						<Input
							s={12}
							value = {this.state.blueprint} 
							onKeyPress={this._handleKeyPress.bind(this)} 
							label="Strand Sequence (i.e.) ATCG"
							type = "text"
							onChange = {this.handleinput.bind(this)}
						/>
					</div>
					<div style = {labelStyle}> 
						<Input
							label="Name (Default: B)" 
							type = "text" 
							s={12}
							className = "validate"
							onChange = {this.handlename2.bind(this)}
						/>
						<Input 					
							name="dnadirection2" 		
							defaultChecked = {(this.state.fiveprime2 == "true")}  
							value={4}  
							type="radio"
							label = "5' to 3'"
							onClick = {this.handleprime.bind(this)}
						/>
						<Input 					
							name="dnadirection2" 		
							defaultChecked = {(this.state.fiveprime2 == "false")}  
							value={5}  
							type="radio"
							label = "3' to 5'"
							onClick = {this.handleprime.bind(this)}
						/>
						<Input 					
							name="dnadirection2" 		
							defaultChecked = {(this.state.fiveprime2 == "loop")}  
							value={6}  
							type="radio"
							label = "Loop DNA"
							onClick = {this.handleprime.bind(this)}
						/>					
						<Input
							s={12}
							value = {this.state.blueprint} 
							onKeyPress={this._handleKeyPress.bind(this)} 
							label="Strand Sequence (i.e.) ATCG"
							type = "text"
							onChange = {this.handleinput2.bind(this)}
						/>
					</div>	

					<Button style = {{marginLeft:"40px"}} onClick = {this.clear.bind(this)}> CLEAR</Button>
					<Button style = {{marginLeft:"20px"}} onClick = {this.mismatchfunction.bind(this)}> SUBMIT</Button>
				
					<div style = {{marginTop:"20px", height:"670px",background:"rgba(0,0,0,.15)",overflow:"hidden"}}> 
						{this.loadcomparescreen()} 
					</div>

				</div>)
	}
		
	render(){
		
		return(		 
			<div>				
				{this.loadbottom()}
			</div>
		);
	}
}