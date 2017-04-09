let User = require('./userModel.js');

module.exports = {
	create	: (req, res) => {
		if (req.body) {
			User.findOne({username: req.body.username}).exec((err, data) => {
				if (data) {
					res.json({status: false, message:'user is already existed'});
				} else {
					let newUser = new User(req.body);
					newUser.save().then(
						(data) => {res.json({status: true, message:"user's created"})},
						(err) => {res.json({status: false, message: err})}
					);
				};
			});
		};
	}
}
