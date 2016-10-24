import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';

import bodyParser from 'body-parser';
import axios from "axios";

import AlgorithmRouter from './algorithm';

let app = express();

app.use(bodyParser.json());
app.use('/SequencingStage/SequenceStrandList',AlgorithmRouter);

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));

app.get('/*',(req,res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000,()=>console.log('Running on localhost'))