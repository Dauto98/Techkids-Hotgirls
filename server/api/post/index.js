let express = require('express');
let controller = require('./postController.js');
let router = express.Router();
let auth = require('../user/authService.js');

//get 15 post
router.get('/', auth.authentication, controller.getPost);

//create post
router.post('/create', auth.authentication, controller.create);

//edit post
router.put('/edit/:id', auth.authentication, controller.edit);

//delete post
router.delete('/delete/:id', auth.authentication, controller.deletePost);

//like post
router.put('/like/:id', auth.authentication, controller.like);

//unlike post
router.put('/unlike/:id', auth.authentication, controller.unlike);

//create a comment
router.post('/comment/:id', auth.authentication, controller.comment);

//edit comment

//delete comment

module.exports = router;
