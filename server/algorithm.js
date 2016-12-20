

import express from 'express';
import path from 'path';
import java from 'java';
import async from 'async';
var AlgorithmRouter = express.Router();

///
var processComponents = function(componentData){
	var list = java.newInstanceSync("java.util.ArrayList");
	for(var i = 0; i < componentData.length; i ++)
	{
		var parsedData = java.newArray("java.lang.String", 
						[componentData[i].name,
						String(componentData[i].length),
						String(componentData[i].complement),
						String(componentData[i].mismatch),
						String(componentData[i].self),
						componentData[i].blueprint, 
						componentData[i].meltingpoint]
					);
		list.add(parsedData, function(err, result) {
		 	if(err) { console.error(err); return; }
		});		
	}
	return list;
}

var processFullStrands = function(fullStrandData){
	var list = java.newInstanceSync("java.util.ArrayList");
	console.log(fullStrandData);
	for(var i = 0; i < fullStrandData.length; i ++)
	{
		//add name to end of component list
		let name = fullStrandData[i].name;
		var unparsedData = fullStrandData[i].components;
		unparsedData.push(name);
		//add this string[] to arraylist
		var parsedData = java.newArray("java.lang.String",unparsedData );
		list.add(parsedData, function(err, result) {
		 	if(err) { console.error(err); return; }
		});		
	}
	return list;
}

///

AlgorithmRouter.post('/',(req,res)=>{
	
		//instanciate node-java and get Middleware
		java.classpath.push(path.resolve(__dirname, './java'));
		java.import('OhayonMiddleware');
		var middleware = java.newInstanceSync("OhayonMiddleware");

		//parsing json data
		var salt = req.body.salt;
		var concentration = JSON.stringify(req.body.concentration);
		var components =  processComponents(req.body.componentlist);
		var fullstrands = processFullStrands(req.body.fullstrandlist);
		
		var timeLimit = req.body.timelimit;


		//sequence and send response
		var data = middleware.sequenceStrands(salt,concentration,components, fullstrands ,(err,data) =>{
			res.json({updatedComponentList:data});
			res.end();
		});

		/*
			Use this for parsing information, calling sequencer		
			async.waterfall([
			    function(callback){
			        callback(null, 'one', 'two');
			    },
			    function(arg1, arg2, callback){
			        // arg1 now equals 'one' and arg2 now equals 'two'
			        callback(null, 'three');
			    },
			    function(arg1, callback){
			        // arg1 now equals 'three'
			        callback(null, 'done');
			    }
			], function (err, result) {
			   // result now equals 'done'    
			});
		*/
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
		});


	}
	catch(e){
		res.send('invalid JSON String');
		res.end();
	}
});

export default AlgorithmRouter;