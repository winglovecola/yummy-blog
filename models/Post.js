const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    poster_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_time: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    updated_time: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
