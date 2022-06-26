const { User, Thought } = require("../models");

module.exports = {
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //TODO - add runValidators: true when creating user createUser

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
          : res.json(user)
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
            ? res.json({ message: "User deleted" })
            : res.status(404).json({ message: "No user with that ID" })
        );
      })
      .catch((err) => res.status(500).json(err));
  },

  // add a friend to user
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((friendData) => res.json(friendData))
      .catch((err) => res.status(400).json(err));
  },

  //delete a friend from user
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } }
    )
      .then((friendData) =>
        !friendData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ message: "User deleted" })
      )
      .catch((err) => res.json(err));
  },
};
