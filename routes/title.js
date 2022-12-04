const { getTitle, hideTitle,visibleTitle} = require("../controllers/title");
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/authorization");
const { isTitleExists } = require("../middlewares/database/queryHelpers");
const entryRoute = require("./entry");
const router = require("express").Router();

router.get("/:slug", isTitleExists, getTitle); //get a title with entries
router.get("/:slug/hide",[isTitleExists,getAccessToRoute, getAdminAccess], hideTitle);
router.get("/:slug/visible", [isTitleExists, getAccessToRoute, getAdminAccess], visibleTitle);
router.use("/:slug", entryRoute); //use entry route

module.exports = router;