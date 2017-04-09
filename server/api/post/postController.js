let Post = require('./postModel.js');

module.exports = {
	getPost : (req, res) => {
		Post.aggregate([{$sort: {updatedAt:1}}, {$limit: 15}]).exec((err, data) => {
			if (err) {
				res.json({status: false, message: err});
			} else {
				res.json({status: true, result: data});
			};
		})
	},

	create : (req, res) => {
		let newPost = new Post(req.body);
		newPost.author = req.user;
		newPost.save().then(
			(data) => {res.json({status: true, message:"post's created"})},
			(err) => {res.json({status: false, message: err})}
		);
	},

	edit : (req, res) => {
		Post.findOne({_id : req.params.id}).exec((err, data) => {
			if (err) {
				res.json({status: false, message: err});
			} else {
				if (data.author != req.user._id) {
					res.json({status: false, messgae: 'hi, nice to meet you, but this post is not your post :v'});
				} else {
					if (req.body.imageUrl) {
						data.imageUrl = req.body.imageUrl;
					};
					if (req.body.title) {
						data.title = req.body.title;
					};
					if (req.body.content) {
						data.content = req.body.content;
					};
					if (req.body.category) {
						data.category = req.body.category;
					};
					data.save().then(
						(data) => {res.json({status: true, message:"post's edited"})},
						(err) => {res.json({status: false, message: err})}
					);
				}
			}
		})
	},

	deletePost	: (req, res) => {
		Post.findOneAndUpdate({_id: req.params.id}, {$set: {'isDeleted' : true}}).exec((err, data) => {
			if (err) {
				res.json({status: false, message: err});
			} else {
				res.json({status: true, message: 'post is deleted, do you want to undo ?'});
			}
		})
	},

	like : (req, res) => {
		Post.findOneAndUpdate({_id : req.params.id}, {$addToSet: {"like": req.user}}).exec((err, data) => {
			if (err) {
				res.json({status: false, message: err});
			} else {
				res.json({status: true, message: "liked"});
			};
		});
	},

	unlike : (req, res) => {
		Post.findOneAndUpdate({_id : req.params.id}, {$pop: {"like": req.user}}).exec((err, data) => {
			if (err) {
				res.json({status: false, message: err});
			} else {
				res.json({status: true, message: "unliked"});
			};
		});
	},

	comment	: (req, res) => {
		if (!req.body) {
			res.json({status: false, message:'comment what ??'})
		} else {
			let newComment = {};
			newComment.content = req.body.content;
			newComment.author = req.user;
			Post.findOneAndUpdate({_id : req.params.id}, {$push: {"comment": newComment}}).exec((err, data) => {
				if (err) {
					res.json({status: false, message: err});
				} else {
					res.json({status: true, message: "commented"});
				};
			});
		}
	}
}
