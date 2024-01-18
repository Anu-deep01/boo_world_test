// controllers/commentController.js
const Comment = require('../models/comment.model');
const Like = require('../models/like.model');

// Get all comments with their like counts
exports.getAllComments = async (req, res) => {
  try {
    let sortOptions = {};
    let filterOptions = {};

    if (req.query.sortBy) {
      if (req.query.sortBy === 'recent') {
        sortOptions.createdAt = -1; // Sort by most recent
      } else if (req.query.sortBy === 'likes') {
        sortOptions.likeCount = -1; // Sort by most likes
      }
    }

    // Add filtering by voting keys
    if (req.query.filterBy) {
      const filterBy = Array.isArray(req.query.filterBy)
        ? req.query.filterBy.map(option => option.toLowerCase())
        : [req.query.filterBy.toLowerCase()];

      filterOptions.$or = filterBy.map(option => ({
        [`voting.${option}.isSelected`]: true
      }));
    }

    const comments = await Comment.find(filterOptions).sort(sortOptions).populate('user');
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new comment
exports.addComment = async (req, res) => {
  const { text, userId, voting } = req.body;

  try {
    const newComment = new Comment({
      text,
      user: userId,
      voting: voting,
    });

    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a comment by its unique identifier
exports.updateComment = async (req, res) => {
  const { commentId, text, voting } = req.body;

  try {
    // Check if the comment with the provided ID exists
    const existingComment = await Comment.findById(commentId);

    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Update the comment properties
    existingComment.text = text || existingComment.text;
    existingComment.voting = voting || existingComment.voting;

    // Save the updated comment
    const updatedComment = await existingComment.save();

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


