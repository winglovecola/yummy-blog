const router = require('express').Router();
const { Comment } = require('../../models');

// Create post comment
router.post('/', async (req, res) => {
  try {
    const postCommentData = await Comment.create({
      post_id: req.body.postid,
      detail: req.body.postCommentDetail,
      poster_id: req.session.userid,
      poster: req.session.username,
      created_time: Date.now(),
      updated_time: Date.now(),
    });

    res.status(200).json(postCommentData);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});


// Edit comment
router.put('/:id', async (req, res) => {
  try {
    const postComment = await Comment.update({
      detail: req.body.commentDetail,
      updated_time: Date.now(),
      
    }, 
    {where: {
      id: req.params.id,
    }});

    res.status(200).json(postComment);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});


//delete post
router.delete('/:id', async (req, res) => {
  
  try {
    let postCommentData = await Comment.findByPk(req.params.id, {});

    if (!postCommentData) {
      res.status(404).json({ message: `No comment found with given ID ${req.params.id}!` });
      return;
    }

    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });


    if (commentData)
      res.status(200).json(`Post ${req.params.id} has been removed.`);
    else
      res.status(200).json(`Failed to remove post ${req.params.id}.`);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

module.exports = router;
