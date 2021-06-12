const router = require("express").Router();
const HabitController = require("../../controllers/HabitController");
const controller = new HabitController();

router.get("/getAllHabitsForUser", (req, res) => {
    controller.getAllHabitsForUser(req, res);
});

router.post("/createHabit", (req, res) => {
    controller.createHabit(req, res);
});

router.put("/updateHabit", (req, res) => {
    controller.updateHabit(req, res);
});

router.delete("/deleteHabit", (req, res) => {
    controller.deleteHabit(req, res);
});

module.exports = router;