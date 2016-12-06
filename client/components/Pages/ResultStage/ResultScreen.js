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
      		background:"rgba(0,0,0,.15)",
      		fontFamily:"'Share Tech Mono',serif", 
      		whiteSpace:"pre",
      		height:"455px",
      		//overflow:"hidden"
    	}
    	let bestarrangementstyle = {
    		background:"rgba(255,255,255,.5)",
    		height:"145px",
    		padding:"15px",
    	}
    	let allarrangementstyle = {
     		
     		height:"260px",
     		padding:"15px",overflow:"scroll"		
    	}
    	let allarrangementitemstyle = {
    		display: "inline-block",
    		marginLeft: "50%",
    		transform: "translate(-50%, 0%) ",
    		height:"50px",
    		marginTop:"20px",
    		marginBottom:"20px",
    		display:"inline-block"
    	}
    	let bestarrangementitemstyle = {
    		display: "inline-block",
    		marginLeft: "50%",
    		transform: "translate(-50%, 0%)"
    	}

    	let results = this.props.results[1];
    	let shiftedarrays = results[2].split("$$$");
 		return  (
		<div style = {resultstyle}> 
			<div style = {bestarrangementstyle}>
				<h4 style = {{textDecoration:"underline",textAlign:"center"}}>
					Best Arrangement
				</h4>
				<h5 style = {bestarrangementitemstyle}>
					{results[1]}
				</h5>

			</div>

			<h4 style = {{textDecoration:"underline",textAlign:"center",height:"30px"}}>
		 			All Arrangements
		 	</h4>

 			<div style = {allarrangementstyle}>

				{shiftedarrays.map(function(listValue,index){	
						return (
							<div key = {index}>
								<h6 style = {allarrangementitemstyle}> 
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


	render()
	{
		return(
			<div> {this.loadresults()} </div>
		)
	}
}





