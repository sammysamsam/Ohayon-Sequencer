import React from "react";
import {Input,Row,Button} from 'react-materialize';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Overview extends React.Component {
	constructor()
	{
		super();
		this.handleSalt = this.handleSalt.bind(this);
		this.handleSaltConcentration = this.handleSaltConcentration.bind(this);
		this.submit = this.submit.bind(this);
		this.state = {
			salt: "",
			concentration:""
		};
	}
	handleSalt(input)
	{	
		if (input.key == 'Enter')
			this.submit();
		if(input.target.value !=this.state.salt)
			this.setState({salt:input.target.value});
	}
	handleSaltConcentration(input)
	{
		if (input.key == 'Enter') 
			this.submit();
		if(input.target.value != this.state.concentration)
			this.setState({concentration:input.target.value});
	}
	submit()
	{
		if(this.state.salt != "Na" && this.state.salt != "Mg")
			Materialize.toast("Unfulfilled Requirement: Salt needs to be 'Na' or 'Mg' ",4000);
		if(this.state.concentration >= 1 || this.state.concentration < 0)
			Materialize.toast("Unfulfilled Requirement: Concentration Range: [0.01] - [1.00] ",4000);
		else
		{
			StrandAction.EditSalt(this.state.salt);	
			StrandAction.EditSaltConcentration(this.state.concentration);
		}
	}
	printComponentList()		
	{	
		let componentList = "";		
		
		if(this.props.complist.length > 0){
			componentList = this.props.complist[0].name;
			for(let i = 1;i < this.props.complist.length; i++)
			{
				componentList = componentList+" , "+ this.props.complist[i].name;
			}
		}

		return(<span style = {{color:"#e3e4e5",fontSize:"17px"}}>{componentList}</span>)
	}

	printStrandList()
	{
		return this.props.strandlist.map(function(listValue,index){
			
			let data = listValue.name + " [ "+listValue.componentsDisplay + " ] ";
			let number =  index +"."
			return( 
				<div key = {listValue.name + "-fullstrand"} >
					<span style = {{display:"inline-block",color:"#e3e4e5",fontSize:"9px",paddingRight:"8px"}}>
						{number}
					</span>
					<h6 style = {{color:"#e3e4e5",width:"380px",textOverflow:"ellipsis",display:"inline-block"}}> 
						{data}
					</h6>
				</div>
			)
		})
	}

	render()
	{

		const bodyStyle = {
			background:"rgba(100, 153, 206,0.3)",
			padding:"2px 0px 15px 30px",
			width:"500px",
			margin:"1.5px",
		}
		const headerStyle = {
			background:"rgba(139, 179, 218,0.7)",
			padding:"10px 0px 0px 30px",
			width:"500px",
			height:"53px",
			margin:"1.5px",
			fontSize:"16px"
		}
		const bodyStyle2 = {
			background:"rgba(100, 153, 206,0.3)",
			padding:"15px 0px 12px 30px",
			width:"500px",
			margin:"1.5px",
		}
		const header2Style= {
			background:"rgba(139, 179, 218,0.7)",
			padding:"10px 0px 0px 30px",
			height:"53px",
			width:"500px",
			margin:"1.5px",
			fontSize:"16px"
		}
		const conditionsPosition = {
			display:"inline-block",
			marginRight:"2px"
		}
		const componentPosition = {
			marginTop:"-386px"
		}
		const fullStrandPosition = {
			display:"inline-block",
			verticalAlign:"top"
		}


		return(
			<div style = {{marginLeft:"17px",color:"white"}}>

				<div className= "animated fadeInUp" style = {conditionsPosition}>

					<div style = {header2Style}> 
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">perm_data_setting</i>
						 <span className="badge">{this.props.Salt} [{this.props.Concentration}]</span> 
						  Adjust Experimental Conditions: 
					</div>						

					<div style = {bodyStyle2}>
							<Row>
								<Input 
								label = "Edit Salt [Na or Mg]:"
								s={6}
								type="text" 
								onChange= {this.handleSalt} 
								style = {{fontSize:"14px"}} 
								/>

								<Input
								s={6}
								label="Edit Salt Concentration:"
								onChange={this.handleSaltConcentration} 
								style = {{fontSize:"14px"}} 
								/>
							<Button waves='light' onClick = {this.submit}>Submit</Button>
							</Row>
						</div>
				</div>

				<div className= "animated fadeInUp" style = {fullStrandPosition}>
					<div style = {headerStyle}> 
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">toc</i>
						Full Strand Overview:
					</div>		
					<div style = {bodyStyle}>
						<h6 style = {{color:"#9e9e9e"}}> 
							Number of Strands: {this.props.strandlist.length} 
						</h6>

						<h6 style = {{color:"#9e9e9e",paddingTop:"5px",paddingBottom:"10px"}}> 
							Strands: 
						</h6>

						<div style = {{height:"468px",overflow:"auto",width:"440px",background:"rgba(255, 255, 255, 0.15)",padding:"10px",color:"white"}}> 
							{this.printStrandList()} 
						</div>			
					</div>
				</div>
		      

					<div className= "animated fadeInUp" style = {componentPosition}>
						<div style = {header2Style}> 
							<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">toc</i>
							Strand Component Overview: 
						</div>						
						<div style = {bodyStyle2}>
							<h6 style = {{color:"#9e9e9e"}}> 
								Number of Components: {this.props.complist.length}
							</h6>
							<h6 style = {{color:"#9e9e9e",paddingTop:"5px",paddingBottom:"10px"}}> 
								Components: 
							</h6>
							<div style = {{height:"234px",overflow:"auto",width:"440px",background:"rgba(255, 255, 255, 0.15)" ,padding:"10px",color:"white" }}> 
								{this.printComponentList()} 
							</div>
						</div>
					</div>

			</div>
		)
	}
}