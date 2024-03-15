'use strict';
module.exports = (sequelize, DataTypes) => {
  const tour = sequelize.define('tour', {
    name: DataTypes.STRING,
    tour_id: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: DataTypes.STRING,
    departure: DataTypes.INTEGER,
    departureText: DataTypes.STRING,
    destination: DataTypes.INTEGER,
    destinationText: DataTypes.STRING,
    discountPer: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    sortDesc: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    time_created: DataTypes.STRING,
    type: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    kindof: DataTypes.INTEGER
  }, {});
  return tour;
};