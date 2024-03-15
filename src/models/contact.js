'use strict';
module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define('contact', {
    date_send: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    code_phone: DataTypes.STRING,
    condition_delivery: DataTypes.STRING,
    departure: DataTypes.STRING,
    destination: DataTypes.STRING,
    email: DataTypes.STRING,
    hscode: DataTypes.STRING,
    item: DataTypes.STRING,
    nation: DataTypes.STRING,
    note: DataTypes.STRING,
    owner: DataTypes.STRING,
    phone: DataTypes.STRING,
    price: DataTypes.STRING,
    time_end: DataTypes.STRING,
    time_start: DataTypes.STRING,
    weight: DataTypes.STRING,
    company: DataTypes.STRING,
    tax_code: DataTypes.STRING,
    tax_place: DataTypes.STRING,
    type: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    file: DataTypes.STRING  
  }, {});
  return contact;
};