const { User, Thought } = require("../models");

module.exports = {
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Sorry, user not created",
            })
          : res.json(`User ${user.username} created 🎉`)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Get all users
  getUsers(req, res) {
    User.find()
      .populate({ path: "friends", select: "-__v" })
      .populate({ path: "thoughts", select: "-__v" })
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: "friends", select: "-__v" })
      .populate({ path: "thoughts", select: "-__v" })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a single user
  updateSingleUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(
              `User updated 🎉. Username: ${user.username}, email: ${user.email}`
            )
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete a user
  //Deleting a user removes a user's associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with that ID" });
        }
        Thought.deleteMany({ username: user.username }).then((deleteThoughts) =>
          deleteThoughts
            ? res.json(`User ${user.username} deleted`)
            : res.status(404).json({ message: "No user with that ID" })
        );
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend to user
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((friendData) =>
        !friendData
          ? res.status(404).json({ message: "Sorry, friend not added" })
          : res.json(`${friendData.friends.slice(-1)[0].username} added to ${friendData.username}'s friend list 🎉`)
      )
      .catch((err) => res.status(400).json(err));
  },

  //Remove a friend from user
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } }
    )
      .then((friendData) =>
        !friendData
          ? res.status(404).json({ message: "No friend with that ID" })
          : res.json(`Friend removed`)
      )
      .catch((err) => res.json(err));
  },
};
