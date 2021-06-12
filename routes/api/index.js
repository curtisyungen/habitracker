const path = require("path");
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const habitRoutes = require("./habitRoutes");

router.use("/users", userRoutes);
router.use("/habits", habitRoutes);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;