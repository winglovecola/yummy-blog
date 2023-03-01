const router = require('express').Router();
const { Post, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');


// mainpage and get all posts
router.get('/', async (req, res) => {
  try {
    const PostData = await Post.findAll();

    const posts = PostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login', {signupStatus: req.session.signupStatus, relogin: req.session.relogin});
});

module.exports = router;
