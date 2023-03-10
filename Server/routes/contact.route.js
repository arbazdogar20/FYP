const router = require('express').Router();
const { 
    sendMessage, 
    deleteMessage, 
    allMessages,
    oneMessage
} = require('../controllers/contact.controller');

// SEND MESSAGE
router.post('/send-message',sendMessage);

// Delete Message
router.delete('/delete-message/:id',deleteMessage);

// All Messages
router.get('/',allMessages);

// Read Message
router.get('/one-message',oneMessage)

module.exports = router;