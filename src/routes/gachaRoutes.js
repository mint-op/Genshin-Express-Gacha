const express = require('express');
const router = express.Router();

const controller = require('../controllers/gachaController');
const middlewares = require('../middlewares/gacha');
const token = require('../middlewares/jwt');

// :banner is either 'char' for character or 'weap' for weapon
router.get('/:banner', token.verifyToken, controller.gachaSingle, middlewares.insertGachaResult, middlewares.ShowGachaResult);
router.get('/multi/:banner', token.verifyToken, controller.gachaMulti, middlewares.insertGachaResult, middlewares.ShowGachaResult);

module.exports = router;
