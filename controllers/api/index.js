const router = require('express').Router();
// API ROUTES
const userRoutes = require('./userRoutes');
const ingredientRoutes = require('./ingredient-routes');

router.use('/users', userRoutes);
router.use('/ingredients', ingredientRoutes);

module.exports = router;
