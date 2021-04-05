const router = require("express").Router();
const { Ingredient, NutriInfo } = require("../../models");
const withAuth = require("../../utils/auth");


// GET ALL INGREDIENTS WITH FOOD
router.get("/", async (req, res) => {
  try {
    const foodData = await Ingredient.findAll({
      include: [{ model: NutriInfo }],
    });
    res.status(200).json(foodData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET ONE INGREDIENT BY ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const foodData = await Ingredient.findByPk(req.params.id);
    if (!foodData) {
      res.status(404).json({ message: "Can't find Food Data" });
      return;
    }
    res.status(200).json(foodData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// SAVE NEW INGREDIENT TO DATA BASE
router.post("/", async (req, res) => {
  try {
    const newIngredient = await Ingredient.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.status(200).json(newIngredient);
  } catch (err) {
    res.status(400).json(err);
  }
});
// DELETE INGREDIENT BY ID
router.delete("/:id", async (req, res) => {
  try {
    const foodData = await Ingredient.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });
    if (!foodData) {
      res.status(404).json({ message: "no ingredient found with this id" });
      return;
    }
    res.status(200).json(foodData);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
