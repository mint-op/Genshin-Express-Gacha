const model = require('../models/gameModel');

module.exports.inventoryAll = async (req, res, next) => {
  const userId = res.locals.userId;

  if (!userId) {
    res.status(404).json({ message: 'Login Required!' });
  } else {
    const getUserData = new Promise((resolve, reject) => {
      model.selectUserById(userId, (errors, results, fields) => {
        if (errors) reject(errors);
        else resolve(results);
      });
    });

    const userData = await getUserData;

    const results = await require('../modules/inventory_module').inventoryAll(userData[0].user_id);

    res.status(200).json(results);
  }
};

module.exports.inventoryChars = async (req, res, next) => {
  const userId = res.locals.userId;

  if (!userId) {
    res.status(404).json({ message: 'Login Required!' });
  } else {
    const getUserData = new Promise((resolve, reject) => {
      model.selectUserById(userId, (errors, results, fields) => {
        if (errors) reject(errors);
        else resolve(results);
      });
    });

    const userData = await getUserData;

    const result = (await require('../modules/inventory_module').inventoryChar(userData[0].user_id)).allchar();

    res.status(200).json(result);
  }
};

module.exports.inventoryChar = async (req, res, next) => {
  const userId = res.locals.userId;
  const { uchar_id } = req.params;

  if (!userId) {
    res.status(404).json({ message: 'Login Required!' });
  } else {
    const getUserData = new Promise((resolve, reject) => {
      model.selectUserById(userId, (errors, results, fields) => {
        if (errors) reject(errors);
        else resolve(results);
      });
    });

    const userData = await getUserData;

    const result = await (await require('../modules/inventory_module').inventoryChar(userData[0].user_id)).charById(uchar_id);

    if (result != 0) res.status(200).json(result);
    else res.status(404).json({ message: 'Character Id does not belong to this user!' });
  }
};

module.exports.inventoryWeaps = async (req, res, next) => {
  const userId = res.locals.userId;

  if (!userId) {
    res.status(404).json({ message: 'Login Required!' });
  } else {
    const getUserData = new Promise((resolve, reject) => {
      model.selectUserById(userId, (errors, results, fields) => {
        if (errors) reject(errors);
        else resolve(results);
      });
    });

    const userData = await getUserData;

    const result = (await require('../modules/inventory_module').inventoryWeap(userData[0].user_id)).allweap();

    res.status(200).json(result);
  }
};

module.exports.inventoryWeap = async (req, res, next) => {
  const userId = res.locals.userId;
  const { uweap_id } = req.params;

  if (!userId) {
    res.status(404).json({ message: 'Login Required!' });
  } else {
    const getUserData = new Promise((resolve, reject) => {
      model.selectUserById(userId, (errors, results, fields) => {
        if (errors) reject(errors);
        else resolve(results);
      });
    });

    const userData = await getUserData;

    const result = await (await require('../modules/inventory_module').inventoryWeap(userData[0].user_id)).weapById(uweap_id);

    if (result != 0) res.status(200).json(result);
    else res.status(404).json({ message: 'Weapon Id does not belong to this user!' });
  }
};

module.exports.databaseAllChar = (req, res, next) => {
  const callback = (errors, results, fields) => {
    if (errors) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAllCharacters(callback);
};

module.exports.databaseAllWeap = (req, res, next) => {
  const callback = (errors, results, fields) => {
    if (errors) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAllWeapons(callback);
};
