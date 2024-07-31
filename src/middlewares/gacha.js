const model = require('../models/gameModel');

module.exports.insertGachaResult = (req, res, next) => {
  // Extract necessary data from res.locals.result
  const { userData, results } = res.locals.result;

  // Import required module
  const { readJSON } = require('../assets/readJSON');

  // Prepare the character object with user_id
  var charObj = {
    user_id: userData.user_id,
  };

  // Iterate over each result
  results.forEach((item) => {
    // Prepare the weapon object with weapon_id and totalAttack
    var weapObj = {
      weapon_id: item.weapon_id,
      totalAttack: item.baseAttack,
    };

    // Check if the item is a character or a weapon
    const isChar = item.character_id != undefined;

    if (isChar) {
      // Check if character already exists for the user
      const char = new Promise((resolve, reject) => {
        const callback = (errors, results, fields) => {
          if (errors) reject(errors);
          else resolve(results);
        };
        // Query the database to get user's characters
        model.selectUserCharacterById(userData.user_id, callback);
      });

      // Process the character if it already exists
      char.then((results) => {
        const uchar = results.find((f) => f.character_id == item.character_id);
        if (uchar) {
          // Define the character level multiplier and rarity mapping
          const multiplier = readJSON('character-level-multiplier.json');
          const rarity = { 5: '5-Star', 4: '4-Star' };

          if (uchar.level != 90) {
            // Increment the level and calculate new stats
            const temp = {
              character_level: uchar.character_level + 1,
              health: uchar.health * multiplier[uchar.character_level][rarity[item.rarity]],
              atk: uchar.atk * multiplier[uchar.character_level][rarity[item.rarity]],
              def: uchar.def * multiplier[uchar.character_level][rarity[item.rarity]],
              character_id: item.character_id,
            };

            /** 
                console.log(temp); // For Debuging
                console.log(multiplier[uchar.level]); // For Debuging
                */

            // Update the character in the database
            const callback = (errors, results, fields) => {
              if (errors) console.error(errors);
            };
            model.updateUserCharacterById(temp, callback);
          } else {
            // Add refund amount if character is already at max level
            res.locals.result['refunds'] += 160;
          }
        } else {
          // Fetch character data
          const charData = readJSON('character-values.json').find((f) => f.Character == item.name);

          // Update the character object with new values
          charObj = {
            ...charObj,
            health: parseFloat(charData.HP),
            atk: parseFloat(charData.ATK),
            def: parseFloat(charData.DEF),
          };
          weapObj = { character_id: item.character_id, ...weapObj };

          // Insert new character and weapon into the database
          const callback_weap = (errors, results, fields) => {
            if (errors) console.error(errors);
            else {
              const callback_char = (errors, results, fields) => {
                if (errors) console.error(errors);
              };
              model.insertNewUserCharacter({ ...charObj, ...weapObj, user_weapon_id: results.insertId }, callback_char);
            }
          };
          model.insertNewUserWeapon({ ...charObj, ...weapObj }, callback_weap);
        }
      });
    } else {
      // Check if weapon already exists for the user
      const weap = new Promise((resolve, reject) => {
        const callback = (errors, results, fields) => {
          if (errors) reject(errors);
          else resolve(results);
        };
        // Query the database to get user's weapons
        model.selectUserWeaponById(userData.user_id, callback);
      });

      weap.then((results) => {
        const uweap = results.find((f) => f.weapon_id == item.weapon_id);
        if (uweap) {
          const type = readJSON('weapon-values.json').filter((f) => f.Rarity[0] == item.rarity);
          const multiplier = readJSON('weapon-1-3-multiplier.json');
          const value = type.find((f) => parseFloat(f.Value) == item.baseAttack);

          if (uweap.level != 90) {
            const temp = {
              weapon_level: uweap.weapon_level + 1,
              totalAttack: item.baseAttack * parseFloat(multiplier[uweap.weapon_level][value.Multiplier]),
              weapon_id: item.weapon_id,
            };

            /** 
                console.log(temp); // For Debuging
                console.log(multiplier[uweap.level]); // For Debuging
                */

            const callback = (errors, results, fields) => {
              if (errors) console.error(errors);
            };
            model.updateUserWeaponById(temp, callback);
          } else {
            res.locals.result['refunds'] += 160;
          }
        } else {
          weapObj = { character_id: item.character_id, ...weapObj };

          const callback = (errors, results, fields) => {
            if (errors) console.error(errors);
          };
          model.insertNewUserWeapon({ ...charObj, ...weapObj }, callback);
        }
        next();
      });
    }
  });
};

module.exports.ShowGachaResult = (req, res, next) => {
  const { primogems, results, refunds } = res.locals.result;

  res.status(200).json([...results, { remaining_primogems: primogems, refunds: refunds }]);

  // res.status(200).json([
  //   ...results.reduce((acc, item) => {
  //     const { name, rarity } = item;
  //     if (item.character_id != undefined) acc.push({ name: name, vision: item.vision_key.toLowerCase(), rarity: rarity });
  //     else acc.push({ name: name, rarity: rarity });
  //     return acc;
  //   }, []),
  //   { remaining_primogems: primogems, refunds: refunds },
  // ]);
};
