import React from "react";

export default class ResultScreen extends React.Component {
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

	loadprintscreen(){
		let resultstyle = {fontFamily:"'Share Tech Mono',serif", padding:"25px",whiteSpace:"pre"}
    	let results = this.props.results[1].split("*");

		return (
			<div style = {resultstyle}>
				<h4 style = {{textAlign:"center",textDecoration:"underline"}}>
					Strand Order (5' to 3')
				</h4>
				
				{results.map(function(listValue){	
					return <h4> {listValue} </h4>	
					})
				}
			</div>
			)
	}
	loadcomparescreen()
	{
		let resultstyle = {
      		overflow:"scroll",
      		fontFamily:"'Share Tech Mono',serif", 
      		padding:"10px 25px 0px 25px",
      		whiteSpace:"pre",
      		height:"460px"
    	}

    	let result = this.props.results[1].split("*");
    	let shiftedarrays = result[2].split("$$$");
    	
 		return  (
		<div style = {resultstyle}> 
			<h4 style = {{textDecoration:"underline",marginBottom:"15px"}}>
				Best Arrangement
			</h4>
			<h5>
				{result[1]}
			</h5>

 			
 			<h4 style = {{textDecoration:"underline",marginTop:"50px"}}>
 				All Arrangements
 			</h4>
			{shiftedarrays.map(function(listValue){	
					return (
						<div><h6 style = {{height:"50px",margin:"20px 0px 20px 0px",display:"inline-block"}}> 
							{listValue} 
								<hr style = {{backgroundColor:"#4d4d4d",height:"1px",marginRight:"20px"}}/>
						</h6> 

						</div>

						)
			})}			

		</div>
		)
	}


	render()
	{
		return(
			<div > {this.loadresults()} </div>
		)
	}
}





