const { Schema, model } = require("mongoose");
const moment = require('moment');

const reactionSchema = new Schema(
  // Schema Settings:
  // This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
  {
    // reactionId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      // type: Schema.Types.ObjectId,
      type: String,
      required: true,
    },
    createdAt: {
      //use a JavaScript date library of your choice or the native JavaScript Date object to format timestamp
      type: Date,
      default: Date.now(),
      immutable: true,
      get: (time) => moment(time).format('MMMM Do YYYY, h:mm:ss a')
      //TODO - Use a getter method to format the timestamp on query
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      //   virtuals: true,
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
    createdAt: {
      //use a JavaScript date library of your choice or the native JavaScript Date object to format timestamp
      type: Date,
      default: Date.now(),
      immutable: true,
      get: (time) => moment(time).format('MMMM Do YYYY, h:mm:ss a')
      //TODO - Use a getter method to format the timestamp on query
    },
    // createdAt: {
    //   //use a JavaScript date library of your choice or the native JavaScript Date object to format timestamp
    //   type: Date,
    //   default: Date.now(),
    //   //TODO - Use a getter method to format the timestamp on query
    // },
    username: {
      // The user that created this thought)
      type: String,
      // type: Schema.Types.ObjectId,
      // ref: "user",
      required: true,
    },
    // user_id: {
    //   // The user that created this thought)
    //   //   type: String,
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
    reactions: [reactionSchema],
    //reactions are like replies
    // Array of nested documents created with the reactionSchema
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

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
