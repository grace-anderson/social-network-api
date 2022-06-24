const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      //use a JavaScript date library of your choice or the native JavaScript Date object to format timestamp
      createdAt: Date.now(),
      // Use a getter method to format the timestamp on query
    },
    username: {
      // The user that created this thought)
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    //reactions are like replies
    // Array of nested documents created with the reactionSchema
  }
  // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;