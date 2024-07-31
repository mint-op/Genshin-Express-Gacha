const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventoryController');
const token = require('../middlewares/jwt');

// Show all from db
router.get('/allChar', controller.databaseAllChar);
router.get('/allWeap', controller.databaseAllWeap);

// * Inventory Route
router.get('/', token.verifyToken, controller.inventoryAll);
router.get('/characters', token.verifyToken, controller.inventoryChars);
router.get('/characters/:uchar_id', token.verifyToken, controller.inventoryChar);

router.get('/weapons', token.verifyToken, controller.inventoryWeaps);
router.get('/weapons/:uweap_id', token.verifyToken, controller.inventoryWeap);

module.exports = router;
