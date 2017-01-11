import express from 'express';
import path from 'path';
import java from 'java';
import async from 'async';
import waterfall from 'async/waterfall';

var AlgorithmRouter = express.Router();

AlgorithmRouter.post('/',(req,res)=>{

			//instanciate node-java and get Middleware

			java.classpath.push(path.resolve(__dirname, './java'));
			java.import('OhayonMiddleware');
			var middleware = java.newInstanceSync("OhayonMiddleware");			

			// run logic 
			async.waterfall([
			    async.apply( 
				    function(req, middleware, callback){		//parsing json data
				    	var salt = req.body.salt;
						var concentration = JSON.stringify(req.body.concentration);
						var components =  processComponents(req.body.componentlist);
						var fullstrands = processFullStrands(req.body.fullstrandlist);
			        	
			        	var timeLimit = req.body.timelimit;
			        	
			        	callback(null, middleware, salt, concentration, components, fullstrands );	

				    }, req, middleware 
				),

			    function(middleware, salt, concentration, components, fullstrands, callback){		

			        var data = middleware.sequenceStrands(salt,concentration,components, fullstrands);
        			res.json({updatedComponentList:data});
					res.end();

			        callback(null);
			    }
			], function (err) {
					if(err)
					{
						res.send('Error! Invalid or Corrupted Data');
						res.end();
					}
			});
});



AlgorithmRouter.post('/Compare',(req,res)=>{
	
	//instanciate node-java and get Middleware

	java.classpath.push(path.resolve(__dirname, './java'));
	java.import('OhayonMiddleware');
	var middleware = java.newInstanceSync("OhayonMiddleware");			

	// run logic 
	async.waterfall([
	    async.apply( 
		    function(req, middleware, callback){		//parsing json data
				var strand1 = req.body.strand1;
				var strand2 = req.body.strand2;

	        	callback(null, middleware, strand1, strand2 );	
		    }, req, middleware 
		),

	    function(middleware, strand1, strand2, callback){		

	        var data =  middleware.compareStrandsSync( strand1.sequence , strand2.sequence)
			console.log("DATA "+data);
			res.json({result:data});
			res.end();
	        callback(null);
	    }
	], function (err) {
			if(err)
			{
				res.send('Error! Invalid or Corrupted Data');
				res.end();
			}
	});	
});

AlgorithmRouter.post('/CompareAll',(req,res)=>{
	//instanciate node-java and get Middleware

	java.classpath.push(path.resolve(__dirname, './java'));
	java.import('OhayonMiddleware');
	var middleware = java.newInstanceSync("OhayonMiddleware");			

	// run logic 
	async.waterfall([
	    async.apply( 
		    function(req, middleware, callback){		//parsing json data

				var components =  processComponents(req.body.componentlist);
				var fullstrands = processFullStrands(req.body.fullstrandlist);
	        	callback(null, middleware, components, fullstrands);	

		    }, req, middleware 
		),

	    function(middleware, components, fullstrands, callback){		

			var data =  middleware.compareAllSync( components, fullstrands )
			res.json({ result1 : data[0] , result2 : data[1] });
			res.end();

	        callback(null);
	    }
	], function (err) {
		if(err){
			res.send('Error! Invalid or Corrupted Data');
			res.end();
		}

	});	

});






//



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
	for(var i = 0; i < fullStrandData.length; i ++)
	{
		//add name to end of component list
		let name = fullStrandData[i].name;
		let unparsedData = fullStrandData[i].components;
		let loop = fullStrandData[i].loop;

		unparsedData.push(name);
		unparsedData.push(loop);

		//add this string[] to arraylist
		var parsedData = java.newArray("java.lang.String",unparsedData );
		list.add(parsedData, function(err, result) {
		 	if(err) { console.error(err); return; }
		});		
	}
	return list;
}




export default AlgorithmRouter;