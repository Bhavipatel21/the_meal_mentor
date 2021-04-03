/* Ingredients 

"id": 8640,
"name": "instant oatmeal",
"image": "rolled-oats.jpg",


Nutrition

"id": 8640,
"name": "instant oatmeal",
"amount": 1.0,
"unit": "CUP",

Nutrition 

"title": "Calories",
"name": "Calories",
"amount": 118.4,
"unit": "mg"

"Calcium","Sugar","Cholesterol","Trans Fat","Fiber","Poly Unsaturated Fat","Carbohydrates","Protein","Sodium","Fat",

*/

NutritionInfo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        sugar: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cholesterol: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        transfat: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fat: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fiber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        carbs: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        protien: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        sodium: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "NutritionInfo",
    }
);

module.exports = NutritionInfo;
