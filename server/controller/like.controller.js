//Like controller
const Like = require('../models/like.model');
const Comment = require('../models/comment.model');

// Add or remove a like to/from a comment and update the like count
exports.toggleLike = async (req, res) => {
  const { userId, commentId } = req.body;

  try {
    // Check if the user has already liked the comment
    const existingLike = await Like.findOne({ user: userId, comment: commentId });

    // If the user already liked the comment, remove the like and decrease the count
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      await Comment.findByIdAndUpdate(commentId, { $inc: { likeCount: -1 } });
      return res.json({ message: 'Like removed successfully' });
    }

    // If the user hasn't liked the comment, add a new like and increase the count
    const newLike = new Like({
      user: userId,
      comment: commentId,
    });

    const savedLike = await newLike.save();
    await Comment.findByIdAndUpdate(commentId, { $inc: { likeCount: 1 } });

    res.json(savedLike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
