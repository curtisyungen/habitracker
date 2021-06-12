const path = require("path");
const router = require("express").Router();
const userRoutes = require("./userRoutes");

router.use("/users", userRoutes);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;