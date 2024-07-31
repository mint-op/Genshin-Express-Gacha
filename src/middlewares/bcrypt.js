require('dotenv').config();
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT_ROUNDS);

// Middleware Function For Comparing Password
module.exports.comparePassword = (req, res, next) => {
  // Check Password
  const callback = (err, isMatch) => {
    if (err) {
      console.error('Error bcrypt:', err);
      res.status(500).json(err);
    } else {
      if (isMatch) {
        next();
      } else {
        res.status(401).json({
          message: 'Wrong password',
        });
      }
    }
  };

  bcrypt.compare(req.body.password, res.locals.hash, callback);
};

// Middleware Function For Hashing Password
module.exports.hashPassword = (req, res, next) => {
  const callback = (err, hash) => {
    if (err) {
      console.error('Error bcypt:', err);
      res.status(500).json(err);
    } else {
      res.locals.hash = hash;
      next();
    }
  };

  bcrypt.hash(req.body.password, saltRounds, callback);
};
