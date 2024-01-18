'use strict';

const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createProfile
} = require('../controller/user.controller');
const {
  getAllComments,
  addComment,
  updateComment
} = require('../controller/comment.controller');
const {
  toggleLike
} = require('../controller/like.controller');

module.exports = function () {

  // User routes
  router.get('/users', getAllUsers);
  router.get('/users/:id', getUserById);
  router.post('/users', createProfile);

  // Comment routes
  router.get('/comments', getAllComments);
  router.post('/comments', addComment);
  router.put('/comments', updateComment);


  // Like routes
  router.post('/likes/toggle', toggleLike);


  return router;
}

