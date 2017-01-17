
var path = require('path');
var java =  require('java');


java.classpath.push(path.resolve(__dirname, './java'));
java.import('OhayonMiddleware');
var test = java.newInstanceSync("Tester");			

java.callMethod(test,"testCompAlgorithm",function(err, data) {
	console.log("\n\n\nresponse started\n\n");
	console.log("response sent?\n\n");
});

java.callMethod(test,"testCompAlgorithm",function(err, data) {
	console.log("\n\n\nresponse started\n\n");
	console.log("response sent?\n\n");
});
