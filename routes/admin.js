const { getAllUsers,blockUser,unblockUser,getAllTitles} = require("../controllers/admin");
const { getAccessToRoute, getAdminAccess, } = require("../middlewares/authorization/authorization");
const { isUserExists, isTitleExists, isEntryExistsInTitle } = require("../middlewares/database/queryHelpers");

const router = require("express").Router();

router.get("/users", [getAccessToRoute,getAdminAccess], getAllUsers);
router.get("/titles", [getAccessToRoute, getAdminAccess], getAllTitles);
router.get("/:user_id/block", [isUserExists,getAccessToRoute, getAdminAccess], blockUser);
router.get("/:user_id/unblock", [isUserExists ,getAccessToRoute, getAdminAccess], unblockUser);
// router.get("/hide-title/:slug", [isTitleExists,getAccessToRoute, getAdminAccess], hideTitle);
// router.get("/hide-entry/:slug/:entry_id", [isEntryExistsInTitle,getAccessToRoute, getAdminAccess], hideEntry);



module.exports = router;

