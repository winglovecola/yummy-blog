const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
