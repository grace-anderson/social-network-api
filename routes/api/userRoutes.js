const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateSingleUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// GET all users
// POST to create a new user
// /api/users
router.route("/").get(getUsers).post(createUser);

// GET a single user by its _id
// PUT to update a user by its _id
// DELETE to remove user by its _id
// /api/users/:userId
router
  .route("/:userId")
  .get(getSingleUser)
  .put(updateSingleUser)
  .delete(deleteUser);

//FRIENDS
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
