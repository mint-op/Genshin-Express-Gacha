const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwt');
const bcryptMiddleware = require('../middlewares/bcrypt');
const middlewares = require('../middlewares/controllers');

router.get('/', controller.selectAllUsers, middlewares.afterSelectAll);
router.get('/:userId', controller.getUserPoints, controller.selectUserById);

router.put('/', jwtMiddleware.verifyToken, controller.selectAllUsers, controller.updateUserById);

router.delete(
  '/',
  jwtMiddleware.verifyToken,
  controller.deleteUserById,
  require('../controllers/messageController').deleteAllMessageByUser,
  require('../controllers/taskPController').deleteAllProgressByUser,
  require('../controllers/gameController').deleteUserData
);

module.exports = router;
