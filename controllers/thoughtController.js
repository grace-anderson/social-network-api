const { Thought, User } = require("../models");

module.exports = {
  // Create a thought
  createThought({ body }, res) {
    Thought.create({ thoughtText: body.thoughtText, username: body.username })
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Thought created, but no user found with that ID",
            })
          : res.json(`${thought.username}'s thought created 🎉`)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a single thought
  updateSingleThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(`Thought updated to '${thought.thoughtText}'🎉`)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(`Thought deleted`)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a reaction to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      {
        $push: {
          reactions: {
            reactionText: body.reactionText,
            username: body.username,
          },
        },
      },
      { new: true, runValidators: true }
    )
      .then(
        (reactionData) =>
          !reactionData
            ? res.status(404).json({
                message: "Reaction added, but no thought with that id",
              })
            : res.json(
                `Reaction '${body.reactionText}' added to thought '${reactionData.thoughtText}' 🎉`
              )
        // : res.json(reactionData)
      )
      .catch((err) => res.status(400).json(err));
  },

  //Remove a reaction from a thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
      .then((reactionData) =>
        !reactionData
          ? res.status(404).json({ message: "No reaction with that ID" })
          : res.json(`Reaction deleted`)
      )
      .catch((err) => res.json(err));
  },
};
