const pool = require('../services/db');

module.exports.selectAll = (callback) => {
  const sqlstatement = `
    SELECT messages.id, message_text, user_id, created_at, users.id as userId, username, email, password, created_on, updated_on, last_login_on
    FROM messages INNER JOIN users ON messages.user_id = users.id;
      `;
  pool.query(sqlstatement, callback);
};

module.exports.selectById = (id, callback) => {
  const sqlstatement = `
    SELECT * FROM messages WHERE id = ?;
    `;
  pool.query(sqlstatement, id, callback);
};

module.exports.insertSingle = (data, callback) => {
  const sqlstatement = `
    INSERT INTO messages (message_text, user_id) VALUES (?, ?);
    `;
  const values = [data.message_text, data.user_id];
  pool.query(sqlstatement, values, callback);
};

module.exports.updateById = (data, callback) => {
  const sqlstatement = `
    UPDATE messages SET message_text = ?, user_id = ? WHERE id = ?;
    `;
  const values = [data.message_text, data.user_id, data.id];
  pool.query(sqlstatement, values, callback);
};

module.exports.deleteById = (id, callback) => {
  const sqlstatement = `
    DELETE FROM messages WHERE id = ?;
    ALTER TABLE messages auto_increment = 1;
    `;
  pool.query(sqlstatement, id, callback);
};

module.exports.deleteAllByUser = (id, callback) => {
  const sqlstatement = `
    DELETE FROM messages WHERE user_id = ?;
    ALTER TABLE messages auto_increment = 1;
  `;
  pool.query(sqlstatement, id, callback);
};
