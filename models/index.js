const User = require('./user');
const NutriInfo = require('./nutrition');
const Ingredient = require('./ingredient');

User.hasMany(Ingredient, {
  foreignKey: 'user_id',
});
Ingredient.belongsTo(User, {
  foreignKey: 'user_id',
});
Ingredient.hasMany(NutriInfo, {
  foreignKey: 'food_id',
});
NutriInfo.belongsTo(Ingredient, {
  foreignKey: 'food_id',
});

module.exports = { User, NutriInfo, Ingredient };
