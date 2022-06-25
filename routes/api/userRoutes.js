const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateSingleUser,
} = require('../../controllers/userController');

// GET all users
// POST a new user:
// /api/users
router.route('/').get(getUsers).post(createUser);

// GET a single user by its _id
// with populated thought and friend data
// /api/users/:userId
router.route('/:userId').get(getSingleUser);

module.exports = router;

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }

// PUT to update a user by its _id
router.route('/:userId').put(updateSingleUser);

// DELETE to remove user by its _id

// BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list