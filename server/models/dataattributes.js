'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dataattributes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dataattributes.belongsTo(models.data,{foreignKey: 'data_id', onDelete: 'CASCADE',})
    }
  }
  dataattributes.init({
    attribute: DataTypes.STRING,
    options: DataTypes.STRING,
    choosed: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dataattributes',
  });
  return dataattributes;
};