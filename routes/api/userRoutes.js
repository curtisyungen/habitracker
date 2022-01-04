const router = require("express").Router();
const UserController = require("../../controllers/UserController");
const controller = new UserController();

router.get("/getUserById", (req, res) => {
    controller.getUserById(req, res);
});

router.post("/findOrCreateUser", (req, res) => {
    controller.findOrCreateUser(req, res);
});

router.put("/updateUser", (req, res) => {
    controller.updateUser(req, res);
});

router.delete("/deleteUser", (req, res) => {
    controller.deleteUser(req, res);
});

module.exports = router;