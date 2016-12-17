import React from "react";
import {Table} from 'react-materialize';
export default class ResultScreen extends React.Component {
	loadprintscreen(){
		let printedStrandsContainerStyle = {
			fontFamily:"'Anaheim',serif",
			padding:"25px",
			overflowY:"scroll",
			overflowWrap: "break-word",
			height:"502px",
			width:"1035px",
			fontWeight:"bold"
		}
    	
    	let results = this.props.results[1].split("*");
		return (
			<div style = {printedStrandsContainerStyle}>
				<h6 style = {{textAlign:"center",textDecoration:"underline",marginBottom:"10px"}}>
					Strand Order [5' to 3']
				</h6>
				<Table className = "responsive-table striped">
			        <thead>
			          <tr>
			              <th data-field="id">Name</th>
			              <th data-field="name">Sequence</th>
			          </tr>
			        </thead>
				    <tbody>
						{results.map(function(listValue,index){	

							if(index != (results.length-1))
							{
								let values = listValue.split(":");
								return     <tr  key = {index} >
										      <td>{values[0]}</td>
										      <td style = {{fontFamily:"'Share Tech Mono',serif"}}>{values[1]}</td>
										    </tr>
							}
						})}
		        	</tbody>
		      	</Table>
			</div>
			)
	}
	loadcomparescreen()
	{
		let resultsContainer = {
      		background:"rgba(0,0,0,.15)",
      		fontFamily:"'Share Tech Mono',serif", 
      		whiteSpace:"pre",
    	}
    	let bestArrangementStyle = {
    		background:"rgba(255,255,255,.5)",
    		height:"160px",
    		padding:"10px",
    	}
    	let allArrangementStyle = {
     		height:"330px",
     		padding:"15px",
     		overflow:"scroll",	
    		fontSize:"12px"
    	}

    	let bestarrangementItemStyle = {
    		display: "inline-block",
    		marginLeft: "50%",
    		transform: "translate(-50%, 0%)",
    		fontSize:"12px"
    	}

    	let results = this.props.results[1];
    	let shiftedarrays = results[2].split("$$$");

 		return  (
		<div style = {resultsContainer}> 
			<div style = {bestArrangementStyle}>
				<div style = {{textDecoration:"underline",textAlign:"center",fontSize:"17px",padding:"5px"}}>
					Best Arrangement: {this.props.list[0].components} vs {this.props.list[1].components}
				</div>
				<div style = {bestarrangementItemStyle}>
					{results[1]}
				</div>

			</div>
 			<div style = {allArrangementStyle }>
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
	}
	
	render()
	{
		return(
			<div> {this.loadresults()} </div>
		)
	}
}





