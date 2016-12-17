import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import $ from 'jquery';
import jQuery from 'jquery';

export default {
	devtools: 'eval-source-map',
	entry: path.join (__dirname,'./client/app.js'),
	output: {
		path:"/",
		publicPath:"/",
	},
	module: { 
		loaders: [
		{ 
			test: /\.js$/,include: path.join(__dirname, 'client'),loaders: [ 'babel'] 
		},
		{
		  	test: /\.css$/,
		  	loader: 'style-loader'
		}, 
		{
		  	test: /\.css$/,
		  	loader: 'css-loader'
		},
		{
        	test: /\.less$/,
        	loader: "style-loader!css-loader!less-loader"
      	},
		{ test: /\.png$/, loader: "url-loader?limit=100000" },
      	{ test:  /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: "file-loader" },
    ]},
	resolve: {
		extensions: ['', '.js', '.jsx','.css']
	},
	plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      "Hammer": "hammerjs/hammer"
    })
  ]
}