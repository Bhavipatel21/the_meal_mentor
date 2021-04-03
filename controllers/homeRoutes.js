const router = require('express').Router();
const { Ingredient, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    if (req.session.logged_in) {
      const IngrdntData = await Ingredient.findAll({
        where: {
          user_id: req.session.user_id,
        },
        attributes: ['name', 'image'],
        include: [
          {
            model: User,
            attributes: { exclude: ['password'] },
          },
        ],
      });
      const Ingredients = IngrdntData.map((ingredients) => Ingredient.get({ plain: true }));

      res.render('dashboard', {
        Ingredients,
        logged_in: req.session.logged_in,
      });
    }
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
