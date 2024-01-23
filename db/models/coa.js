'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  coa.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      position: DataTypes.ENUM(['Debit', 'Kredit']),
    },
    {
      sequelize,
      modelName: 'coa',
    }
  );
  return coa;
};
