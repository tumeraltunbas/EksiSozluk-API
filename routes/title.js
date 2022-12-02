const { getTitle} = require("../controllers/title");
const { isTitleExists } = require("../middlewares/database/queryHelpers");
const entryRoute = require("./entry");
const router = require("express").Router();

router.get("/:slug", isTitleExists, getTitle); //get a title with entries
router.use("/:slug", entryRoute); //use entry route

module.exports = router;