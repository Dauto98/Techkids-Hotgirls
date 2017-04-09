let mongoose = require('mongoose');

let post = mongoose.Schema({
	author		: {
		type	: mongoose.Schema.Types.ObjectId,
		ref		: 'user'
	},
	imageUrl	: String,
	title			: String,
	content 	: String,
	category	: String,
	view			: {
		type		: Number,
		default : 0
	},
	like				: [{
		type	: mongoose.Schema.Types.ObjectId,
		ref		: 'user'
	}],
	comment			: [{
		author : {
			type	: mongoose.Schema.Types.ObjectId,
			ref		: 'user'
		},
		content : String,
		isDeleted	: {
			type 		: Boolean,
			default	: false
		}
	}],
	isDeleted		: {
		type		: Boolean,
		default	: false
	}
}, {timestamps : true});

module.exports = mongoose.model('post', post);
