
const router = require("express").Router();
const { ingredient, nutritionInfo } = require("../models");

router.get("/", async(req, res) => {
	try {
		const ingredients = await ingredient.findAll([
				include: [model: nutritionInfo]
		]);
		res.status(200).json(ingredients);
	} catch(err) {
		res.status(500).json(err);
	}
})

router.post("/", async (req, res) => {
	try {
		const newIngredient = await ingredient.create({
			...req.body,
			userId: req.session.userId;
		});
		res.status(200).json(newIngredient);
	} catch(err) {
		res.status(400).json(err);
	}
});

router.delete("/:id", async(req, res) => {
	try {
		const ingredientData = await ingredient.destroy({
			where: {
				id: req.params.id,
				userId: req.session.userId;
			},
		})
		if (ingredientData) {
			res.status(404).json({ message: "no ingredient found with this id" });
			return;
		}
		res.status(200).json(ingredientData);

	} catch(err) {
		res.status(400).json(err);
	}
});
