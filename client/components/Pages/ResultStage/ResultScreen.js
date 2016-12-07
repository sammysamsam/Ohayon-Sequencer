import React from "react";

export default class ResultScreen extends React.Component {
	loadprintscreen(){
		let printedStrandsContainerStyle = {
			fontFamily:"'Anaheim',serif",
			padding:"25px",
			overflowY:"scroll",
			overflowWrap: "break-word",
			height:"452px",
			width:"1065px",
			fontWeight:"bold"
		}
    	
    	let results = this.props.results[1].split("*");
		return (
			<div style = {printedStrandsContainerStyle}>
				<h3 style = {{textAlign:"center",textDecoration:"underline",marginBottom:"10px"}}>
					Strand Order [5' to 3']
				</h3>
				<ul >
				{results.map(function(listValue,index){	
					if(index != (results.length-1))
					{
						return <li ><h4 style = {{margin:"4px"}} key = {index}> {listValue} </h4>	</li>
					}

					})
				}
				</ul>
			</div>
			)
	}
	loadcomparescreen()
	{
		let resultsContainer = {
      		background:"rgba(0,0,0,.15)",
      		fontFamily:"'Share Tech Mono',serif", 
      		whiteSpace:"pre",
      		height:"452px",
      		//overflow:"hidden"
    	}
    	let bestArrangementStyle = {
    		background:"rgba(255,255,255,.5)",
    		height:"145px",
    		padding:"15px",
    	}
    	let allArrangementStyle = {
     		
     		height:"260px",
     		padding:"15px",overflow:"scroll"		
    	}
    	let allArrangementItemStyle = {
    		display: "inline-block",
    		marginLeft: "50%",
    		transform: "translate(-50%, 0%) ",
    		height:"50px",
    		marginTop:"20px",
    		marginBottom:"20px",
    		display:"inline-block"
    	}
    	let bestarrangementItemStyle = {
    		display: "inline-block",
    		marginLeft: "50%",
    		transform: "translate(-50%, 0%)"
    	}

    	let results = this.props.results[1];
    	console.log(results)
    	let shiftedarrays = results[2].split("$$$");

 		return  (
		<div style = {resultsContainer}> 
			<div style = {bestArrangementStyle}>
				<h4 style = {{textDecoration:"underline",textAlign:"center"}}>
					Best Arrangement
				</h4>
				<h5 style = {bestarrangementItemStyle}>
					{results[1]}
				</h5>

			</div>

			<h4 style = {{textDecoration:"underline",textAlign:"center",height:"30px"}}>
		 			All Arrangements
		 	</h4>

 			<div style = {allArrangementStyle }>

				{shiftedarrays.map(function(listValue,index){	
						return (
							<div key = {index}>
								<h6 style = {allArrangementItemStyle}> 
									{listValue} 
									<hr style = {{backgroundColor:"#4d4d4d",height:"1px",marginRight:"20px"}}/>
								</h6> 
							</div>
							)
				})}		
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





