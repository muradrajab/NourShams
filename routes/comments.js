const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

// Create
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const { userId, username: author } = req;
   const newComment= await Comment.create({
      comment,
      postId,
      userId,
      author,
    });
     res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:commentid", verifyToken, async (req, res) => {
  try {
    const commenetFount= await Comment.findById(req.params.commentid);
    //console.log({typeofcomment: typeof commenetFount,commenetFount })
    if (!commenetFount){
      return  res.status(404).json("Comment not found");
    }
    await Comment.findByIdAndDelete(req.params.commentid);
    res.status(200).json("Comment has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get all coments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get post comments
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId});
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
