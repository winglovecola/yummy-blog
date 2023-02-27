const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment};
