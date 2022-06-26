const router = require("express").Router();

const {
  createThought,
  getThoughts,
  getSingleThought,
  updateSingleThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// GET to get all thoughts
// POST to create a new thought
// Created thoughts are pushed to associated user's thoughts array field
router.route("/").get(getThoughts).post(createThought);

// GET to get a single thought by its _id
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateSingleThought)
  .delete(deleteThought);

//REACTIONS
//   POST to create a reaction stored in a single thought's reactions array field
//   DELETE to pull and remove a reaction by the reaction's reactionId
router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
