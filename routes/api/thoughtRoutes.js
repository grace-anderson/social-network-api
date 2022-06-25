const router = require("express").Router();

const {
    createThought,
    getThoughts,
    getSingleThought,
    deleteThought
  } = require("../../controllers/thoughtController");

// /api/thoughts

// GET to get all thoughts
// POST to create a new thought
// (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route("/").get(getThoughts).post(createThought);

// GET to get a single thought by its _id
// DELETE to remove a thought by its _id
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)

//   PUT to update a thought by its _id
  
  
//REACTIONS
//   /api/thoughts/:thoughtId/reactions
  
//   POST to create a reaction stored in a single thought's reactions array field
  
//   DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = router;

// // example data
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
//   }