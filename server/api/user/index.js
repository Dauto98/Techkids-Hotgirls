let express = require('express');
let controller = require('./userController.js');
let router = express.Router();
let passport = require('passport');
let jwt = require('jsonwebtoken');
let configs = require('../../configs/index.js');

let auth = require('./authService.js');

require('./passport.js')();

router.post('/login', (req, res, next) => {
	passport.authenticate('local', function(err, user, info){
		let error = err || info;
		if (error) {
			return res.status(401).json(error);
		};
		let token = jwt.sign({data: user}, configs.secret, {expiresIn: '10m'});
		res.json({status: true, message: 'login success', token: token});
	})(req, res, next);
});

router.post('/create', controller.create);

router.get('/', auth.authentication, controller.getAll);

module.exports = router;
