const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

// GET all messages
router.get('/messages', messageController.getAllMessages)

// POST new message
router.post('/messages', messageController.postNewMessage)

module.exports = router;
