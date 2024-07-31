const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../middlewares/jwt');
const bcryptMiddleware = require('../middlewares/bcrypt');
const middlewares = require('../middlewares/controllers');
const assets = require('../controllers/assetsController');
const { register, login, checkUsernameOrEmailExist, selectAllUsers } = require('../controllers/userController');

const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');
const taskRoutes = require('./taskRoutes');
const taskPRoutes = require('./taskPRoutes');
const gameRoutes = require('./gameRoutes');
const gachaRoutes = require('./gachaRoutes');
const inventoryRoutes = require('./inventoryRoutes');

router.post(
  '/register',
  checkUsernameOrEmailExist,
  bcryptMiddleware.hashPassword,
  register,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);
router.post('/login', selectAllUsers, login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.use('/user', userRoutes);
router.use('/msg', messageRoutes);
router.use('/task', taskRoutes);
router.use('/taskP', taskPRoutes);
router.use('/game', gameRoutes);
router.use('/gacha', gachaRoutes);
router.use('/inv', inventoryRoutes);

router.post(
  '/jwt/generate',
  middlewares.preTokenGenerate,
  jwtMiddleware.generateToken,
  middlewares.beforeSendToken,
  jwtMiddleware.sendToken
);

router.post(
  '/jwt/generate',
  middlewares.preTokenGenerate,
  jwtMiddleware.generateToken,
  middlewares.beforeSendToken,
  jwtMiddleware.sendToken
);
router.get('/jwt/verify', jwtMiddleware.verifyToken, middlewares.showTokenVerified);
router.post('/bcrypt/compare', middlewares.preCompare, bcryptMiddleware.comparePassword, middlewares.showCompareSuccess);
router.post('/bcrypt/hash', bcryptMiddleware.hashPassword, middlewares.showHashing);

router.get('/assets/:folderType/:folderName/:fileName', assets.reader);

module.exports = router;
