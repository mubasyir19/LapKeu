'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      journal.belongsTo(models.coa, {
        foreignKey: 'id_coa',
      });

      journal.belongsTo(models.account, {
        foreignKey: 'id_account',
      });
    }
  }
  journal.init(
    {
      id_account: DataTypes.STRING,
      date: DataTypes.DATE,
      description: DataTypes.STRING,
      id_coa: DataTypes.STRING,
      typeAmount: DataTypes.ENUM(['Debit', 'Kredit']),
    },
    {
      sequelize,
      modelName: 'journal',
    }
  );
  return journal;
};
