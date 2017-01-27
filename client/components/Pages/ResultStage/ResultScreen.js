import React from "react";
import {Row,Input,Table} from 'react-materialize';
export default class ResultScreen extends React.Component {
	constructor()
	{
		super();
		this.handleDisplayUpdate = this.handleDisplayUpdate.bind(this);
		this.state = {
			fullAnalysisDisplay:0
		}
	}

	//


	loadprintscreen(){
		let printedStrandsContainerStyle = {
			fontFamily:"'Anaheim',serif",
			padding:"25px",
			height:"712px",
			width:"1035px",
			fontWeight:"bold"
		}
    	
    	let results = this.props.results[1];
		return (
			<div style = {printedStrandsContainerStyle}>
				<h6 style = {{textAlign:"center",textDecoration:"underline",marginBottom:"10px"}}>
					Strand Order [5' to 3']
				</h6>
				<div style = {{	overflowY:"scroll",overflowWrap: "break-word",height:"630px"}}>
					<Table className = "responsive-table">
				        <thead>
				          <tr>
				              <th data-field="id">Name</th>
				              <th data-field="name">Sequence</th>
				          </tr>
				        </thead>
					    <tbody>
							{results.map(function(listValue,index){	
								let values = listValue.split(":");
								return     (<tr  key = {index} >
										      <td>{values[0]}</td>
										      <td style = {{fontFamily:"'Share Tech Mono',serif"}}>{values[1]}</td>
										    </tr>)
							})}
			        	</tbody>
			      	</Table>
			    </div>
			</div>
			)
	}

	//


	loadcomparescreen()
	{
		let resultsContainer = {
    		background:"rgba(255,255,255,.5)",
    		fontFamily:"'Share Tech Mono',serif", 
      		whiteSpace:"pre",
    	}
    	let bestArrangementStyle = {

    		height:"130px",
    		padding:"10px",
    	}
    	let allArrangementStyle = {
     		height:"426px",
     		padding:"5px",
     		overflow:"scroll",	
    		fontSize:"13px"
    	}
    	let bestarrangementItemStyle = {
    		display: "inline-block",
    		marginLeft: "50%",
    		transform: "translate(-50%, 0%)",
    		fontSize:"14px"
    	}
    	if(this.props.results[1] == "")
    		return(<div></div>)
    			
    	let shiftedarrays = (this.props.results[1][1]).split("$$$");
 		return  (
		<div style = {resultsContainer}> 
			<div style = {bestArrangementStyle}>
				<div style = {{textDecoration:"underline",textAlign:"center",fontSize:"17px",padding:"5px"}}>
					Strongest Base Pairing Arrangement:  {this.props.results[2]}
				</div>
				<div style = {bestarrangementItemStyle}>
					{this.props.results[1][0]}
				</div>

			</div>
 			<div style = {allArrangementStyle }>
				<Table responsive = {true} 
						stripped = {true} 
						bordered = {true}
						hoverable = {true}>
			        <thead>
			          <tr>
			              <th data-field="id">All Arrangements</th>
			          </tr>
			        </thead>
				    <tbody>
						{shiftedarrays.map(function(listValue,index){	
								return (<tr key = {index} >
									      <td>{listValue} </td>
									    </tr>
								)
						})}
		        	</tbody>
		      	</Table>
			</div>
		</div>
		)
	}


	//

	handleDisplayUpdate(e)
	{
		this.setState({fullAnalysisDisplay:e.target.value});
	}

	loadfullanalysis()
	{
		let resultsContainer = {
      		fontFamily:"'Share Tech Mono',serif", 
      		whiteSpace:"pre",
      		marginTop:"-1px",
      		height:"600px",
      		paddingBottom:"40px",
      		paddingTop:"40px"
    	}
    	let bodyStyle = {
     		overflow:"scroll",
     		padding:"10px",
     		height:"595px"
    	}
    	let results = [];
    	let title = "";
    	if(this.props.results[1].length > 0 && this.state.fullAnalysisDisplay == 0) //components
    	{
    		title = "Components Analysis/Comparison";
    		results = this.props.results[1];
    	}

    	if(this.props.results[2].length > 0 && this.state.fullAnalysisDisplay == 1) //fullstrand
    	{
    		title = "Full Strands Analysis/Comparison";
    		results = this.props.results[2];
    	}


		return  (
			<div style = {resultsContainer}> 
				<div style = {{paddingLeft:"520px"}}>
					<Row >
						<Input 		
							name="display" 
							value = {0} 
							defaultChecked={true}
							label = "Components Analysis" 
							type="radio"  
							onClick = {this.handleDisplayUpdate}
							 className='with-gap'
							/>   
						<Input 
							name="display" 
							value = {1} 
							label = "Full Strands Analysis" 
							type="radio"  
							 className='with-gap'
							onClick = {this.handleDisplayUpdate} 
						/>  
					</Row>
				</div>
	 
	 			<div style = {bodyStyle }>
					<Table responsive = {true} 
							stripped = {true} 
							bordered = {true}
							hoverable = {true}>
					<thead>
			          <tr>
			              <th data-field="id">{title}</th>
			          </tr>
			        </thead>
					    <tbody style = {{fontSize:"15px"}}>
							{results.map(function(listValue,index){	
									return (<tr key = {index} >
										      <td>{listValue} </td>
										    </tr>
									)
							})}
			        	</tbody>
			      	</Table>
				</div>
			</div>
			)

	}



	loadresults()
	{		

		if(this.props.results[0] == "PRINT")
		{
			return this.loadprintscreen();
		}
		if(this.props.results[0] == "COMPARE")
		{
			return this.loadcomparescreen();
		}
		if(this.props.results[0] == "FULLANALYSIS")
		{
			return this.loadfullanalysis();
		}
	}
	
	render()
	{
		return(
			<div> {this.loadresults()} </div>
		)
	}
}





