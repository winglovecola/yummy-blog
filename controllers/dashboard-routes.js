const router = require('express').Router();
const { Post, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// mainpage and get all posts
router.get('/', async (req, res) => {
  try {
    const PostData = await Post.findAll({
      where: {
        poster_id: req.session.userid,
      },
    });

    const posts = PostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




module.exports = router;
