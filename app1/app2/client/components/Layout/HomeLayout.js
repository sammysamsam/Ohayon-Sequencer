import React from "react";
import { Link } from "react-router";
export default class HomeLayout extends React.Component {
	render(){		
		return(
				<div> 
					<h1> Welcome to the greatest app of all time </h1>
					<Link to = "DevelopmentStage"> <h1> Get Started </h1> </Link>
					<Link to = "LoadProject"> <h1>Load Existing Project </h1> </Link>
					<img src={'https://pbs.twimg.com/profile_images/555358832696635392/fvyL3k4p.jpeg'} alt="YOEL" className="img-responsive"/>
				</div>
		);
	}
}