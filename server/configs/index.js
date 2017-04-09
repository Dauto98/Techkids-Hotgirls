let express = require('express');
let bodyParser = require('body-parser');
let routes = require('../route.js');

module.exports = {
	port 	: 7554,

	settingExpress : (app) => {
		app.use(bodyParser.urlencoded({extended:false}));
		app.use(bodyParser.json());
		routes(app);
	},

	mongoUri	: 'mongodb://localhost/techkidshotgirls',
	secret	: 'notengoelperro'
};
