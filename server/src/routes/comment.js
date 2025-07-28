const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../middlewares/authMiddleware'); // your auth middleware

// Add a comment to an article
router.post('/:articleId/comment', authenticate, commentController.addComment);

// Get comments for an article
router.get('/:articleId/comment', commentController.getComments);

// Delete a comment
router.delete('/:articleId/comment', authenticate, commentController.deleteComment);

module.exports = router;
