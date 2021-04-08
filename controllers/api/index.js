const router = require('express').Router();
// API ROUTES
const userRoutes = require('./userRoutes');
const nutritionInfoRoutes = require('./nutritionInfo-routes');
//const ingredientRoutes = require('./ingredient-routes');

router.use('/users', userRoutes);
router.use('/nutritionInfo', nutritionInfoRoutes);
//router.use('/ingredients', ingredientRoutes);

module.exports = router;
