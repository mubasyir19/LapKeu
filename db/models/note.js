'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      note.belongsTo(models.account, {
        foreignKey: 'id_account',
      });
    }
  }
  note.init(
    {
      id_account: DataTypes.STRING,
      description: DataTypes.STRING,
      amount: DataTypes.BIGINT,
      type: DataTypes.ENUM(['Cash', 'Transfer']),
      bank: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'note',
    }
  );
  return note;
};
