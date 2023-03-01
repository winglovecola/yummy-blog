const router = require('express').Router();
const { Post, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');



// get post
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postCommentData = await Comment.findByPk(req.params.id);

    const comment = postCommentData.get({ plain: true });

    //console.log (post);
    res.render('post-comment', {comment, loggedIn: req.session.loggedIn});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
