const db = require("../models/index.js");

class HabitController {
    getAllHabitsForUser(req, res) {
        db.Users.findOne({
            where: {
                email: req.query.email,
            }
        }).then(user => {
            db.Habits.findAll({
                where: {
                    userId: user.dataValues.userId,
                }
            }).then(habits => {
                let result = [];
                for (var i = 0; i < habits.length; i++) {
                    result.push({ name: habits.dataValues.name, ...habits[i].dataValues });
                }
                res.json(result);
            });
        }).catch(e => {
            console.log(e);
        });
    }

    createHabit(req, res) {
        db.Users.findOne({
            where: {
                email: req.body.email,
            }
        }).then(user => {
            db.Habits.create({
                userId: user.dataValues.userId,
                ...req.body.habit,
            });
        }).then(() => {
            res.json("Habit created.");
        }).catch(e => {
            console.log(e);
        });
    }

    updateHabit(req, res) {
        db.Habits.update(
            req.body.habit,
        ).then(() => {
            res.json("Habit updated.");
        }).catch(e => {
            console.log(e);
        });
    }

    deleteHabit(req, res) {
        db.Users.findOne({
            where: {
                email: req.body.email,
            }
        }).then(user => {
            db.Habits.destroy({
                where: {
                    habitId: req.body.habitId,
                    userId: user.dataValues.userId,
                }
            });
        }).then(() => {
            res.json("Habit deleted.");
        }).catch(e => {
            console.log(e);
        });
    }
}

module.exports = HabitController;
