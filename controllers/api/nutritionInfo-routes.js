const router = require("express").Router();
const { NutriInfo, User } = require("../../models");
const withAuth = require("../../utils/auth");


// GET ALL NUTRITIONINFO RECORDS
router.get("/", async (req, res) => {
  try {
    const nutritionInfo = await NutriInfo.findAll({include: User});
    res.status(200).json(nutritionInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET ONE NUTRITIONINFO BY ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const nutritionInfo = await NutriInfo.findByPk(req.params.id);
    if (!nutritionInfo) {
      res.status(404).json({ message: "Can't find NutritionInfo Data" });
      return;
    }
    res.status(200).json(nutritionInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SAVE NEW NUTRITIONINFO TO DATA BASE
router.post("/", async (req, res) => {
  const body = req.body
  console.log(body.nutrition);
  try {
    const newNutritionInfo = await NutriInfo.create({
      ...body.nutrition,
      user_id: req.session.user_id
    });
    res.status(200).json(newNutritionInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE NUTRITIONINFO BY ID
router.delete("/:id", async (req, res) => {
  try {
    const nutritionInfo = await NutriInfo.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!nutritionInfo) {
      res.status(404).json({ message: "no ingredient found with this id" });
      return;
    }
    res.status(200).json(nutritionInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;