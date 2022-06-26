const { Schema, model } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
  // reactionSchema is a subdocument schema in the Thought model
  {
    reactionText: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      immutable: true,
      //getter method, formats timestamp using moment library
      get: (time) => moment(time).format("MMMM Do YYYY, h:mm:ss a"),
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      immutable: true,
      //getter method, formats timestamp using moment library
      get: (time) => moment(time).format("MMMM Do YYYY, h:mm:ss a"),
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual reactionCount retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
