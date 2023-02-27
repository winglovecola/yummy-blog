const router = require('express').Router();
const { Post, Comment } = require('../../models');

// Create post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      subject: req.body.postSubject,
      detail: req.body.postDetail,
      img_url: req.body.postImgurl,
      poster_id: req.session.userid,
      poster: req.session.username,
      created_time: Date.now(),
      updated_time: Date.now(),
    });

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

// Edit post
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update({
      subject: req.body.postSubject,
      detail: req.body.postDetail,
      img_url: req.body.postImgurl,
      updated_time: Date.now(),
      
    }, 
    {where: {
      id: req.params.id,
    }});

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});


//delete post
router.delete('/:id', async (req, res) => {
  
  try {
    let postData = await Post.findByPk(req.params.id, {});

    if (!postData) {
      res.status(404).json({ message: `No post found with given ID ${req.params.id}!` });
      return;
    }


    postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    //console.log ("postData", postData)

    const commentData = await Comment.destroy({
      where: {
        post_id: req.params.id,
      },
    });


    if (postData)
      res.status(200).json(`Post ${req.params.id} has been removed.`);
    else
      res.status(200).json(`Failed to remove post ${req.params.id}.`);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

module.exports = router;
