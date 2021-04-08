const User = require('./user');
const NutriInfo = require('./nutritionInfo');
//const Ingredient = require('./ingredient');

User.hasMany(NutriInfo, {
  foreignKey: 'user_id',
});
NutriInfo.belongsTo(User, {
  foreignKey: 'user_id',
});



module.exports = { User, NutriInfo };
