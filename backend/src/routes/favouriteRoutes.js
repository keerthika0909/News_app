const router = require("express").Router();
const ctrl = require("../controllers/favouriteController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, ctrl.add);
router.get("/", auth, ctrl.getAll);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;