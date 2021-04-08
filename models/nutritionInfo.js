const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class NutriInfo extends Model {}

NutriInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
    sugar: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
    cholesterol: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
    transfat: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
    fat: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
    fiber: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
    carbs: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
    protien: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
    sodium: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },

  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'NutriInfo',
  },
);


module.exports = NutriInfo;
