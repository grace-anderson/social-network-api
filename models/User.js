const { Schema, model } = require("mongoose");

//Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    //how to "unique"
    //how to "Trimmed"
  },
  email: {
    type: String,
    required: true,
    //how to "unique"
    //Must match a valid email address (look into Mongoose's matching validation)
  },
  //thoughts - Array of _id values referencing the Thought model
  thoughts: [thoughtSchema],
  //friends - Array of _id values referencing the User model (self-reference)
  friends: [userSchema], //self-reference?

  //Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
});

const User = model("user", userSchema);

module.exports = User;
