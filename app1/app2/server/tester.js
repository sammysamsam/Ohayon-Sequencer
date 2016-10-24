var java = require("java");
java.classpath.push("./java");
java.import('StackBuilder');
var list = java.newInstanceSync("StackBuilder");
console.log(list.RunAlgorithmSync("Na","1.0",["m,10,true,5,5,o-o-o-o-o-o-o-o-o-o-o","om,10,true,5,5,o-o-o-o-o-o-o-o-o-o-o"]));