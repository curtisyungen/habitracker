const db = require("../models/index.js");

class UserController {
    getUser(req, res) {
        db.Users.findOne({
            where: {
                userId: req.query.userId,
            }
        }).then(user => {
            res.json(user);
        }).catch(e => {
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
                name: req.body.user.name,
                settings: req.body.user.settings,
                status: req.body.user.status,
            }
        }).spread((user, created) => {
            if (created) {
                res.json("User created.");
            } else {
                res.json("User found.");
            }
        }).catch(e => {
            console.log(e);
        });
    }

    updateUser(req, res) {
        db.Users.update(
            req.body.user
        ).then(() => {
            res.json("User updated.");
        }).catch(e => {
            console.log(e);
        });
    }

    deleteUser(req, res) {
        db.Users.destroy({
            where: {
                userId: req.body.userId,
            }
        }).then(() => {
            res.json("User deleted.");
        }).catch(e => {
            console.log(e);
        });
    }
}

module.exports = UserController;
