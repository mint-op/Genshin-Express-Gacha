const model = require('../models/gameModel');

module.exports.gachaSingle = async (req, res, next) => {
  const userId = res.locals.userId;
  const banner = req.params.banner;

  if (!userId) {
    res.status(404).json({ message: 'Login Required!' });
  } else {
    const getUserData = new Promise((resolve, reject) => {
      const callback = (errors, results, fields) => {
        if (errors) reject(errors);
        else resolve(results);
      };
      model.selectUserById(userId, callback);
    });

    const userData = await getUserData;

    // Prepare the data object for gacha
    var data = {
      user_id: userId,
      counter4: userData[0].counter4,
      counter5: userData[0].counter5,
    };

    if (userData[0].primogems < 160) {
      res.status(404).json({ message: 'Not enough primogems!' });
    } else {
      // Deduct the primogems and update the data object
      data = { ...data, primogems: userData[0].primogems - 160 };

      // Perform the gacha and get the result
      let drop = (await require('../modules/gacha_module').gacha(data)).single(banner);

      // Update the counter values in the data object
      const counter = drop.splice(drop.length - 1, 1)[0];
      // * Update Counter Values to data object
      data['counter5'] = counter[0];
      data['counter4'] = counter[1];

      const callback = (errors, results, fields) => {
        if (errors) console.error(errors);
      };

      // Update the user's primogems and pity counter in the database
      model.updatePrimogems(data, callback);
      model.updatePityCounter(data, callback);

      // Set the result in the response.locals
      res.locals.result = { userData: userData[0], results: drop, primogems: data.primogems, refunds: 0 };
      next();
    }
  }
};

module.exports.gachaMulti = async (req, res, next) => {
  const userId = res.locals.userId;
  const banner = req.params.banner;

  if (!userId) {
    // Return an error message if the user is not logged in
    res.status(404).json({ message: 'Login Required!' });
  } else {
    // Get user data from the database
    const getUserData = new Promise((resolve, reject) => {
      model.selectUserById(userId, (errors, results, fields) => {
        if (errors) reject(errors);
        else resolve(results);
      });
    });

    const userData = await getUserData;

    // Prepare the data object
    var data = {
      user_id: userId,
      counter4: userData[0].counter4,
      counter5: userData[0].counter5,
    };

    if (userData[0].primogems < 1600) {
      // Return an error message if the user does not have enough primogems
      res.status(404).json({ message: 'Not enough primogems!' });
    } else {
      // Update the data object with the new primogems value
      data = { ...data, primogems: userData[0].primogems - 1600 };

      // Perform the gacha and get the results
      let drop = (await require('../modules/gacha_module').gacha(data)).multi(banner);

      // Extract the counter values from the drop array
      const counter = drop.splice(drop.length - 1, 1)[0];

      // Update the counter values in the data object
      data['counter5'] = counter[0];
      data['counter4'] = counter[1];

      const callback = (errors, results, fields) => {
        if (errors) console.error(errors);
      };

      // Update the primogems and pity counter values in the database
      model.updatePrimogems(data, callback);
      model.updatePityCounter(data, callback);

      // Set the response locals with the necessary data
      res.locals.result = { userData: userData[0], results: drop, primogems: data.primogems, refunds: 0 };
      next();
    }
  }
};
