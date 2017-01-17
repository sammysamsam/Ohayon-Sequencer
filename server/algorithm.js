import express from 'express';
import path from 'path';
import java from 'java';
import async from 'async';
import waterfall from 'async/waterfall';

var AlgorithmRouter = express.Router();

AlgorithmRouter.post('/',(req,res)=>{

	//instanciate node-java and get Middleware

	var timeLimit = req.body.timelimit;
    res.setTimeout(60000*(timeLimit+1), function(){
    console.log('Request has timed out.');
        res.send(408);
    });


	java.classpath.push(path.resolve(__dirname, './java'));
	java.import('OhayonMiddleware');
	var middleware = java.newInstanceSync("OhayonMiddleware");			

	var salt = req.body.salt;
	var concentration = JSON.stringify(req.body.concentration);
	var components =  processComponents(req.body.componentlist);
	var fullstrands = processFullStrands(req.body.fullstrandlist);


	java.callMethod(middleware,"sequenceStrands",parseInt(timeLimit),salt,concentration,components, fullstrands,function(err, data) {
		console.log("\n\n\nresponse started\n\n");
		res.json({updatedComponentList:data});
		res.end();	
		if(err) { 
			res.send('Error During Sequencing!');
			res.end();
		}
		console.log("response sent?\n\n");
	});
});

AlgorithmRouter.post('/Compare',(req,res)=>{
	
	//instanciate node-java and get Middleware

	java.classpath.push(path.resolve(__dirname, './java'));
	java.import('OhayonMiddleware');
	var middleware = java.newInstanceSync("OhayonMiddleware");			
	var strand1 = req.body.strand1;
	var strand2 = req.body.strand2;

	let direction1 = false;
	let direction2 = false;
	if(strand1.direction == "loop")
		direction1 = true;
	if(strand2.direction == "loop")
		direction2 = true;

	middleware.compareStrands( strand1.sequence , direction1, strand2.sequence, direction2 ,function(err, data) {
    	res.json({data:data});
		res.end();
	
		if(err)
		{
			res.send('Error During Comparison Calculations!');
			res.end();
		}
	});

});

AlgorithmRouter.post('/CompareAll',(req,res)=>{
	//instanciate node-java and get Middleware

	java.classpath.push(path.resolve(__dirname, './java'));
	java.import('OhayonMiddleware');
	var middleware = java.newInstanceSync("OhayonMiddleware");	

	var components =  processComponents(req.body.componentlist);
	var fullstrands = processFullStrands(req.body.fullstrandlist);
	

	let data =  middleware.compareAll( components, fullstrands ,function(err, data) {
		res.json({ result1 : data[0] , result2 : data[1] });
		res.end();
		if(err)
		{
			res.send('Error During Comparison Calculations!');
			res.end();
		}
	});
});




//



var processComponents = function(componentData){//name,length,complement,mismatch,self,blueprint,meltingpoint
	var list = java.newInstanceSync("java.util.ArrayList");
	for(var i = 0; i < componentData.length; i ++)
	{
		var parsedData = java.newArray("java.lang.String", 
						[componentData[i].name,
						String(componentData[i].length),
						String(componentData[i].complement),
						String(componentData[i].mismatch),
						String(componentData[i].self),
						componentData[i].sequence,
						componentData[i].blueprint, 
						componentData[i].meltingpoint]
					);
		list.addSync(parsedData);
	}
	return list;
}

var processFullStrands = function(fullStrandData){ //components,name,fiveprime,componentsDisplay
	var list = java.newInstanceSync("java.util.ArrayList");
	for(var i = 0; i < fullStrandData.length; i ++)
	{
		//add name to end of component list
		let data = fullStrandData[i];
		if(data.fiveprime == "3' to 5'")
			data.components.reverse();

		let unparsedData = data.components;
		unparsedData.push(data.name)
		unparsedData.push(data.fiveprime);

		//add this string[] to arraylist
		var parsedData = java.newArray("java.lang.String",unparsedData );
		list.addSync(parsedData);
	}
	return list;
}




export default AlgorithmRouter;
		   		
