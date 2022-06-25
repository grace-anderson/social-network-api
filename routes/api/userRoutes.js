const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateSingleUser,
  deleteUser
} = require("../../controllers/userController");

// GET all users
// POST to create a new user:
// /api/users
router.route("/").get(getUsers).post(createUser);

// GET a single user by its _id
// TODO with populated thought and friend data
// PUT to update a user by its _id
// DELETE to remove user by its _id
// TODO - BONUS: Remove a user's associated thoughts when deleted.
// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateSingleUser).delete(deleteUser);

//FRIENDS
// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

module.exports = router;

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
