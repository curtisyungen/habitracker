const db = require("../models/index.js");

const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

class HabitController {
    getAllHabitsForUser(req, res) {
        db.Habits.findAll({
            where: {
                userId: req.query.userId,
            },
            order: [["title", "ASC"]],
        })
            .then((habits) => {
                res.json(habits);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getHabitById(req, res) {
        db.Habits.findOne({
            where: {
                id: req.query.habitId,
            },
        })
            .then((habit) => {
                res.json(habit);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    createHabit(req, res) {
        db.Habits.create({
            userId: req.body.userId,
            ...req.body.habitData,
        })
            .then((result) => {
                res.json(result);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateHabit(req, res) {
        db.Habits.update(
            { ...req.body.habitData },
            {
                where: {
                    id: req.body.habitId,
                    userId: req.body.userId,
                },
            }
        )
            .then((result) => {
                res.json(result);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteHabit(req, res) {
        db.Habits.destroy({
            where: {
                habitId: req.body.habitId,
                userId: req.body.userId,
            },
        })
            .then((result) => {
                res.json(result);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

module.exports = HabitController;
