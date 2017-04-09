module.exports = function(app) {
	app.use('/user', require('./api/user/index.js'));
	app.use('/post', require('./api/post/index.js'));
}
