'use strict';
module.exports = (sequelize, DataTypes) => {
  const tour = sequelize.define('blog', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    discountPer: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    desc: DataTypes.TEXT,
    time_created: DataTypes.STRING,
    type: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    author: DataTypes.STRING
  }, {});
  return tour;
};