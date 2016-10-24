
import express from 'express';
import path from 'path';
import java from 'java';


var AlgorithmRouter = express.Router();

AlgorithmRouter.post('/',(req,res)=>{

	//try{
		java.classpath.push(path.resolve(__dirname, './java'));
		java.import('StackBuilder');
		var list = java.newInstanceSync("StackBuilder");

		var salt = req.body.salt;
		var concentration = JSON.stringify(req.body.concentration);
		var strands = req.body.strandlist;


		console.log("server says:"+salt+" "+concentration +"  "+strands);
		console.log("algorithm start");
		var result = list.RunAlgorithmSync(salt,concentration,strands);
		console.log("algorithm end");
		console.log(result);
		res.json({strandlist:result});
		res.end();
	/*
	}
	catch(e){
		console.log("errorrr");
		res.send('invalid JSON String');
		res.end();
	}
	*/
});



export default AlgorithmRouter;