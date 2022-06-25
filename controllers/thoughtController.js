const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // create a thought
  createThought({ body }, res) {
    Thought.create({ thoughtText: body.thoughtText, username: body.username })
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Thought created 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
