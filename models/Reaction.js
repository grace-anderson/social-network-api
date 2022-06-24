const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
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
      type: String,
      required: true,
    },
    createdAt: {
      //use a JavaScript date library of your choice or the native JavaScript Date object to format timestamp
      createdAt: Date.now(),
      // Use a getter method to format the timestamp on query
    },
  }
  // Schema Settings:

  // This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
);
