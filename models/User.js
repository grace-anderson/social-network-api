const { Schema, model } = require("mongoose");

//Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //Must match a valid email address (look into Mongoose's matching validation)
    },
    //thoughts - Array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    //friends - Array of _id values referencing the User model (self-reference)
    // friends: [userSchema], //self-reference?
    friends: [
      {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }
  ]
},
  //Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length
});

const User = model("User", userSchema);

module.exports = User;
