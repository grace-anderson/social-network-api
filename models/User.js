const { Schema, model } = require("mongoose");
const { validateEmail } = require("../utils/validator");

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
      match: /.+\@.+\..+/,
      unique: true,
    },
    //user's thoughts 
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    //users' friends 
    friends: [
      {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }
  ]
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//friendCount that retrieves the number of user's friends (using the length of the user's friends array field on query)
userSchema.virtual('friendCount').get(function() {
  return this.friends.length
});

const User = model("User", userSchema);

module.exports = User;
