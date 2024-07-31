const express = require('express');
const router = express.Router();

const controller = require('../controllers/messageController');
const jwtMiddleware = require('../middlewares/jwt');
const bcryptMiddleware = require('../middlewares/bcrypt');
const middlewares = require('../middlewares/controllers');

router.get('/', controller.readAllMessage);
router.post('/', jwtMiddleware.verifyToken, controller.createMessage);
router.get('/:id', controller.readMessageById);
router.put('/:id', controller.updateMessageById);
router.delete('/:id', controller.deleteMessageById);

module.exports = router;
