const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  // Schema Settings:
  // This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
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
      //Use a getter method to format the timestamp on query
    },
  },
  {
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
      //Use a getter method to format the timestamp on query
    },
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
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
  // TODO - Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
