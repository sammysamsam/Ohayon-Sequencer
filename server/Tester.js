
var java = require('java');
var path = require('path');

var processComponents = function(componentData){
	var list = [];
	for(var i = 0; i < componentData.length; i ++)
	{
		list.push( 
			[componentData[i].name, 
			String(componentData[i].length),
			String(componentData[i].complement),
			String(componentData[i].mismatch),
			String(componentData[i].self),
			componentData[i].blueprint, 
			componentData[i].meltingpoint]
		)
	}
	return list;
}
var processFullStrands = function(fullStrandData){
	var list = [];
	for(var i = 0; i <fullStrandData.length; i ++)
	{
		list.push( 
			[[fullStrandData[i].name],fullStrandData[i].components]
		)
	}
	return list;
}

java.classpath.push(path.resolve(__dirname, './java'));
console.log("START");

java.import('OhayonMiddleware');
var middleware = java.newInstanceSync("OhayonMiddleware");

var newArray = java.newArray("java.lang.String", ["item1", "item2", "item3"]);
var list = java.newInstanceSync("java.util.ArrayList");
list.addSync(list);
list.addSync()
console.log(middleware.LOL2Sync(list));

