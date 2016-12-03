import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
export default {
	devtools: 'eval-source-map',
	entry: path.join (__dirname,'./client/app.js'),
	output: {
		path:"/",
		publicPath:"/",
	},
	module: { 
		loaders: [
		{ test: /\.js$/,include: path.join(__dirname, 'client'),loaders: [ 'babel'] },
      	{ test: /\.css$/, loader: "style-loader!css-loader" },
      	{ test: /\.png$/, loader: "url-loader?limit=100000" },
      	{ test: /\.jpg$/, loader: "file-loader" }
    ]},
	resolve: {
		extensions: ['', '.js', '.jsx','.css']
	}
}