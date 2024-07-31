const pool = require('../services/db');

// ===================================================================

// UserData Model

module.exports.selectAllUser = (callback) => {
  const sqlstatement = `
      SELECT * FROM userdata;
    `;
  pool.query(sqlstatement, callback);
};

module.exports.selectUserById = (user_id, callback) => {
  const sqlstatement = `
      SELECT * FROM userdata WHERE user_id = ?;
      `;
  pool.query(sqlstatement, user_id, callback);
};

module.exports.deleteUserById = (user_id, callback) => {
  const sqlstatement = `
      DELETE FROM userdata WHERE user_id = ?;
      ALTER TABLE userdata AUTO_INCREMENT = 1;
      `;
  pool.query(sqlstatement, user_id, callback);
};

module.exports.insertNewUser = (data, callback) => {
  const sqlstatement = `
      INSERT INTO userdata (user_id, name, primogems) VALUES (?, ?, ?);
      `;
  const VALUES = [data.user_id, data.name, data.primogems];
  pool.query(sqlstatement, VALUES, callback);
};

module.exports.updatePrimogems = (data, callback) => {
  const sqlstatement = `
      UPDATE userData SET primogems = ? WHERE user_id = ?;
    `;
  const VALUES = [data.primogems, data.user_id];
  pool.query(sqlstatement, VALUES, callback);
};

module.exports.updatePityCounter = (data, callback) => {
  const sqlstatement = `
      UPDATE userData SET counter5 = ?, counter4 = ? WHERE user_id = ?;
    `;
  const VALUES = [data.counter5, data.counter4, data.user_id];
  pool.query(sqlstatement, VALUES, callback);
};

// ===================================================================

// UserCharacter Model & UserWeapon Model

module.exports.insertNewUserCharacter = (data, callback) => {
  const sqlstatement = `
    INSERT INTO user_character (user_id, character_id, user_weapon_id, health, atk, def) VALUES (?, ?, ?, ?, ?, ?);
  `;
  const VALUES = [data.user_id, data.character_id, data.user_weapon_id, data.health, data.atk, data.def];
  pool.query(sqlstatement, VALUES, callback);
};

module.exports.insertNewUserWeapon = (data, callback) => {
  const sqlstatement = `
    INSERT INTO user_weapon (user_id, weapon_id, totalAttack) VALUES (?, ?, ?);
  `;
  const VALUES = [data.user_id, data.weapon_id, data.totalAttack];
  pool.query(sqlstatement, VALUES, callback);
};

module.exports.selectUserCharacterById = (user_id, callback) => {
  const sqlstatement = `
    SELECT * FROM user_character WHERE user_id = ?;
  `;
  pool.query(sqlstatement, user_id, callback);
};

module.exports.selectUserWeaponById = (user_id, callback) => {
  const sqlstatement = `
    SELECT * FROM user_weapon WHERE user_id = ?;
  `;
  pool.query(sqlstatement, user_id, callback);
};

// This will return the user's characters and weapons joined together
module.exports.selectUserDataById = (data, callback) => {
  const sqlstatement = `
    SELECT * FROM user_character INNER JOIN user_weapon ON 
    user_character.user_weapon_id = user_weapon.user_weapon_id 
    WHERE user_character.user_character_id = ? and user_character.user_id = ?;
  `;
  const VALUES = [data.user_character_id, data.user_id];
  pool.query(sqlstatement, VALUES, callback);
};

module.exports.updateUserCharWeap = (data, callback) => {
  const sqlstatement = `
    UPDATE user_character SET user_weapon_id = ? WHERE user_character_id = ?;
  `;
  const VALUES = [data.user_weapon_id, data.user_character_id];
  pool.query(sqlstatement, VALUES, callback);
};

module.exports.updateUserCharacterById = (data, callback) => {
  const sqlstatement = `
    UPDATE user_character SET character_level = ?, health = ?, atk = ?, def = ? WHERE character_id = ?;
  `;
  const VALUES = [data.character_level, data.health, data.atk, data.def, data.character_id];
  pool.query(sqlstatement, VALUES, callback);
};

module.exports.updateUserWeaponById = (data, callback) => {
  const sqlstatement = `
    UPDATE user_weapon SET weapon_level = ?, totalAttack = ? WHERE weapon_id = ?;
  `;
  const VALUES = [data.weapon_level, data.totalAttack, data.weapon_id];
  pool.query(sqlstatement, VALUES, callback);
};

// ===================================================================

// Character & Weapon Model

module.exports.selectAllCharacters = (callback) => {
  const sqlstatement = `
    SELECT * FROM characters;
  `;
  pool.query(sqlstatement, callback);
};

module.exports.selectCharacterById = (character_id, callback) => {
  const sqlstatement = `
    SELECT * FROM characters WHERE character_id = ?;
  `;
  pool.query(sqlstatement, character_id, callback);
};

module.exports.selectAllWeapons = (callback) => {
  const sqlstatement = `
    SELECT * FROM weapons;
  `;
  pool.query(sqlstatement, callback);
};

module.exports.selectWeaponById = (weapon_id, callback) => {
  const sqlstatement = `
    SELECT * FROM weapons WHERE weapon_id = ?;
  `;
  pool.query(sqlstatement, weapon_id, callback);
};

// * ===================================================================
