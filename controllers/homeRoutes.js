const router = require("express").Router();
const { NutriInfo, User } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/nutrition/:id', withAuth, async (req, res) => {
  try {
    const foodData = await NutriInfo.findByPk(req.params.id);
  
    const viewNutri = foodData.get({ plain: true });

    console.log('something happens right before this', viewNutri);
    res.render('nutrition', {
      ...viewNutri,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("homepage");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
