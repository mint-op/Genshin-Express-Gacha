const model = require('../models/userModel');

module.exports.register = (req, res, next) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: res.locals.hash,
  };

  if (!data.username || !data.email || !data.password) {
    return res.status(404).json({ Error: 'Username Or Email Or Password not found!' });
  }

  const callback = (error, results, fields) => {
    if (error) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.locals.userId = results.insertId;
      res.locals.message = `User ${data.username} created successfully.`;
      next();
    }
  };

  model.insertSingle(data, callback);
};

module.exports.login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({ message: 'Username or Password not found!' });
  }

  const user = res.locals.selectAll.find((f) => f.username === username);
  const { last_login_on, ...etc } = user;
  // Update last login
  const data = {
    last_login_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
    ...etc,
  };

  const callback = (error, results, fields) => {
    if (error) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.locals.userId = data.id;
      res.locals.hash = data.password;
      next();
    }
  };

  model.updateSingle(data, callback);
};

module.exports.checkUsernameOrEmailExist = (req, res, next) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
  };

  if (!data.username || !data.email) {
    return res.status(404).json({ message: 'Username or Email not found!' });
  }

  const callback = (error, results, fields) => {
    if (error) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      if (results.length != 0) {
        res.status(409).json({ message: 'Username or Email already exists' });
      } else {
        next();
      }
    }
  };

  model.selectByNameOrEmail(data, callback);
};

module.exports.selectAllUsers = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.locals.selectAll = results;
      next();
    }
  };

  model.selectAll(callback);
};

module.exports.selectUserById = (req, res) => {
  const userId = req.params.userId;

  const callback = (error, results, fields) => {
    if (error) console.error('Error readUserById', error);
    else {
      if (results.length == 0) {
        // Mysql returns an empty array
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ ...results[0], points: res.locals.points });
      }
    }
  };

  model.selectSingleById(userId, callback);
};

module.exports.getUserPoints = (req, res, next) => {
  const userId = req.params.userId;

  const callback = (errors, results, fields) => {
    if (errors) console.error('Error getUserPoints', errors);
    else {
      if (results[0].points == null) {
        res.locals.points = 0;
      } else {
        res.locals.points = parseInt(results[0].points);
      }

      next();
    }
  };

  model.getUserPoints(userId, callback);
};

module.exports.updateUserById = (req, res, next) => {
  const userId = res.locals.userId;
  const user = res.locals.selectAll.find((f) => f.id == userId);

  const data = {
    username: req.body.username || user.username,
    email: req.body.email || user.email,
    password: req.body.password || user.password,
    updated_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
    last_login_on: user.last_login_on,
    id: userId,
  };

  if (!data.username && !data.email && !data.password) {
    return res.status(404).json('Invalid fields!');
  }

  const callback = (error, results, fields) => {
    if (error) {
      res.status(500).json({ Error: 'Internal Server Error!' });
    } else {
      res.status(204).send();
    }
  };

  model.updateSingle(data, callback);
};

module.exports.deleteUserById = (req, res, next) => {
  const userId = res.locals.userId;

  const callback = (error, results, fields) => {
    if (error) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      next();
    }
  };

  model.deleteSingleById(userId, callback);
};
