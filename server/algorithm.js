
//import AsyncRouter from 'express-async-router';
import express from 'express';
import path from 'path';
import java from 'java';
import async from 'async';
//var AlgorithmRouter = AsyncRouter.AsyncRouter({send: false});
var AlgorithmRouter = express.Router();

AlgorithmRouter.post('/',(req,res)=>{
	try{		
		var salt = req.body.salt;
		var concentration = JSON.stringify(req.body.concentration);
		var strands = req.body.strandlist;


		java.classpath.push(path.resolve(__dirname, './java'));

		java.import('OhayonMiddleware');
		var middleware = java.newInstanceSync("OhayonMiddleware");
		
		var data =  middleware.processStrands(salt,concentration,strands, (err,data) =>{
			res.json({strandlist:data});
			res.end();
		});


	}
	catch(e){
		res.send('invalid JSON String');
		res.end();
	}
});


//


AlgorithmRouter.post('/Compare',(req,res)=>{
	
	try{		
		var salt = req.body.salt;
		var concentration = JSON.stringify(req.body.concentration);
		var strand1 = req.body.strand1;
		var strand2 = req.body.strand2;


		java.classpath.push(path.resolve(__dirname, './java'));
		java.import('OhayonMiddleware');
		var middleware = java.newInstanceSync("OhayonMiddleware");
		
		var data =  middleware.compareStrands(strand1.name , strand1.sequence , strand2.name , strand2.sequence , (err,data) =>{
			res.json({result:data});
			res.end();
			console.log(data);
		});


	}
	catch(e){
		res.send('invalid JSON String');
		res.end();
	}
});


export default AlgorithmRouter;