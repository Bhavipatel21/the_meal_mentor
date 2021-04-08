const router = require("express").Router();
const { User,  NutriInfo } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const foodData = await NutriInfo.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const searchedFoods = foodData.map((food) => food.get({ plain: true }));
    console.log('hey------', searchedFoods)
    res.render('dashboard', {
      ...searchedFoods,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
