const { getAccessToRoute,getEntryOwnerAccess, getAdminAccess } = require("../middlewares/authorization/authorization");
const { isTitleOpened, isEntryExistsInTitle } = require("../middlewares/database/queryHelpers");
const router = require("express").Router({mergeParams:true});
const {createEntry,likeEntry,dislikeEntry,undoLikeEntry,undoDislikeEntry,editEntry,favoriteEntry,hideEntry, visibleEntry} = require("../controllers/entry");

router.post("/entry",[getAccessToRoute, isTitleOpened] , createEntry); //creating an entry route
router.get("/:entry_id/like", [getAccessToRoute, isEntryExistsInTitle], likeEntry); //like an entry
router.get("/:entry_id/undolike", [getAccessToRoute, isEntryExistsInTitle], undoLikeEntry); //undo like an entry
router.get("/:entry_id/dislike", [getAccessToRoute, isEntryExistsInTitle], dislikeEntry); //dislike an entry
router.get("/:entry_id/undodislike", [getAccessToRoute, isEntryExistsInTitle], undoDislikeEntry); //undo dislike an entry
router.put("/:entry_id/edit", [getAccessToRoute, isEntryExistsInTitle, getEntryOwnerAccess], editEntry); //edit an entry
router.get("/:entry_id/favorite", [getAccessToRoute, isEntryExistsInTitle], favoriteEntry); //add to favorites an entry
router.get("/:entry_id/hide", [isEntryExistsInTitle, getAccessToRoute, getAdminAccess], hideEntry);
router.get("/:entry_id/visible", [isEntryExistsInTitle, getAccessToRoute, getAdminAccess], visibleEntry);


module.exports = router;