'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      account.hasMany(models.note, {
        foreignKey: 'id_account',
      });
    }
  }
  account.init(
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM(['Admin', 'Yayasan']),
    },
    {
      sequelize,
      modelName: 'account',
    }
  );
  return account;
};
