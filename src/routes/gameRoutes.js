const express = require('express');
const router = express.Router();

const controller = require('../controllers/gameController');
const token = require('../middlewares/jwt');

router.post('/', token.verifyToken, controller.userData);
router.get('/', token.verifyToken, controller.selectUserData);
router.delete('/', token.verifyToken, controller.deleteUserData);

module.exports = router;
