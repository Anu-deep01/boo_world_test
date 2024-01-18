const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  voting: {
    mbti: {
      isSelected: {
        type: Boolean,
        default: false
      },
      content: {
        type: String,
      },
    },
    enneagram: {
      isSelected: {
        type: Boolean,
        default: false
      },
      content: {
        type: String,
      },
    },
    zodiac: {
      isSelected: {
        type: Boolean,
      },
      content: {
        type: String,
        required: true,
      },
    },
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
