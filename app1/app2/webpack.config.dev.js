import path from 'path';
import webpack from 'webpack';
export default {
	devtools: 'eval-source-map',
	entry: path.join (__dirname,'./client/app.js'),
	output: {
		path:"/",
		publicPath:"/",
	},
	module: {
		loaders: [{
			test: /\.js$/,
			include: path.join(__dirname, 'client'),
			loaders: [ 'babel']
		}]
	},
	resolve: {
		extentions: ['','.js']
	}
}