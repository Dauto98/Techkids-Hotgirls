let mongoose = require('mongoose');

let likeSchema = mongoose.Schema({
	username	: {
		type		: String,
		unique	: true
	}
},{_id : false});

let commentSchema = mongoose.Schema({
	username : String,
	body 		 : String
},{_id : false});

let post = mongoose.Schema({
	imgage			: String,
	description : String,
	like				: [likeSchema],
	comment			: [commentSchema]
}, {timestamp : true});

module.exports = mongoose.model('post', post);
