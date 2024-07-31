const { selectUserById, insertNewUser, deleteUserById } = require('../models/gameModel');
const { selectAllCharacters, selectAllWeapons } = require('../models/gameModel');
const { readJSON } = require('../assets/readJSON');
const pool = require('../services/db');

// Create a new User Data with the given ID.
const newUserData = async (id) => {
  // Fetch weapons and characters
  const weapons = await getWeapons();
  const characters = await getCharacters();

  // Map the character details
  const charMap = {
    name: 'Traveler',
    vision: 'ANEMO',
    weapon: 'Dull Blade',
  };

  // SQL statements for inserting character and weapon data
  const sqlstatements = {
    insertChar: `INSERT INTO user_character (user_id, character_id, user_weapon_id, health, atk, def) VALUES (?, ?, ?, ?, ?, ?);`,
    insertWeap: `INSERT INTO user_weapon (weapon_id, user_id, totalAttack) VALUES (?, ?, ?);`,
  };

  // Callback function to handle errors.
  const callback = (errors, results, fields) => {
    if (errors) console.error(errors);
  };

  // Insert the weapon data
  const insertWeapon = new Promise((resolve, reject) => {
    const weapon = weapons.filter((f) => f.name == charMap.weapon);
    if (weapon.length == 0) console.log('Weapon not found');
    else {
      pool.query(sqlstatements.insertWeap, [weapon[0].weapon_id, id, weapon[0].baseAttack], (errors, results, fields) => {
        if (errors) reject(errors);
        else {
          resolve(results);
          console.log('UserWeapon added');
        }
      });
    }
  });

  // Insert the character data
  insertWeapon
    .then((result) => {
      const character = characters.filter((f) => f.name == charMap.name && f.vision_key == charMap.vision);
      if (character.length == 0) console.log('Character not found');
      else {
        const charData = readJSON('character-values.json').find((f) => f.Character == charMap.name);
        pool.query(
          sqlstatements.insertChar,
          [id, character[0].character_id, result.insertId, parseFloat(charData.HP), parseFloat(charData.ATK), parseFloat(charData.DEF)],
          callback
        );
        console.log('UserCharacter added');
      }
    })
    .catch((error) => console.error(error));
};

// Handle User Data
module.exports.userData = async (req, res, next) => {
  const _data = {
    name: req.body.name,
    userId: res.locals.userId, // From Token
  };

  // Check if the user exists in the database
  selectUserById(_data.userId, (errors, results, fields) => {
    if (errors) {
      console.error('Error selectUserById ', errors);
    } else {
      if (results.length == 0) {
        // Insert new user
        const data = {
          user_id: _data.userId,
          name: _data.name,
          primogems: 320,
        };
        insertNewUser(data, (error, results, fields) => {
          if (error) {
            console.error('Error insertNewUser', error);
          } else {
            newUserData(data.user_id);
            res.status(200).send();
          }
        });
      } else {
        res.status(200).send();
      }
    }
  });
};

function getWeapons() {
  return new Promise((resolve, reject) => {
    const callback = (errors, results, fields) => {
      if (errors) reject('Error getWeapons ', errors);
      else resolve(results);
    };

    selectAllWeapons(callback);
  });
}

function getCharacters() {
  return new Promise((resolve, reject) => {
    const callback = (errors, results, fields) => {
      if (errors) reject('Error getCharacters ', errors);
      else resolve(results);
    };

    selectAllCharacters(callback);
  });
}

module.exports.selectUserData = (req, res, next) => {
  const userId = res.locals.userId;

  const callback = (errors, results, fields) => {
    if (errors) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  };

  selectUserById(userId, callback);
};

module.exports.deleteUserData = (req, res, next) => {
  const userId = res.locals.userId;

  const callback = (errors, results, fields) => {
    if (errors) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.status(204).send();
    }
  };

  deleteUserById(userId, callback);
};
