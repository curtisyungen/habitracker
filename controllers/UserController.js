const db = require("../models/index.js");

class UserController {
    getUserById(req, res) {
        db.Users.findOne({
            where: {
                userId: req.query.userId,
            },
        })
            .then((user) => {
                res.json(user);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    findOrCreateUser(req, res) {
        db.Users.findOrCreate({
            where: {
                email: req.body.user.email,
            },
            defaults: {
                userId: Math.round(Math.random() * 1000000000),
                userName: req.body.user.name,
                theme: "Light",
                status: "Active",
            },
        })
            .spread((user, created) => {
                res.json(user);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateUser(req, res) {
        db.Users.update(
            { ...req.body.userData },
            {
                where: {
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

    deleteUser(req, res) {
        db.Users.destroy({
            where: {
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

module.exports = UserController;
