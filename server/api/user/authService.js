let jwt = require('jsonwebtoken');
let configs = require('../../configs/index.js');

module.exports = {
	authentication	:	function(req, res, next){
		jwt.verify(req.headers.authorization, configs.secret, (err, decoded) => {
			if (err) {
				res.json({status: false, message: err});
			} else {
				req.user = decoded.data;
				return next();
			}
		});
	}
}
