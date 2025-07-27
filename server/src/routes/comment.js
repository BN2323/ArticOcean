const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../middlewares/authMiddleware'); // your auth middleware

// Add a comment to an article
router.post('/:id/', authenticate, commentController.addComment);

// Get comments for an article
router.get('/:id/', commentController.getComments);

// Delete a comment
router.delete('/:id/', authenticate, commentController.deleteComment);

module.exports = router;
