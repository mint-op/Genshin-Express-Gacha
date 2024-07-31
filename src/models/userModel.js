const pool = require('../services/db');

module.exports.selectAll = (callback) => {
  const sqlstatement = `
    SELECT * FROM users;
    `;
  pool.query(sqlstatement, callback);
};

module.exports.selectSingleById = (id, callback) => {
  const sqlstatement = `
    SELECT * FROM users WHERE id = ?;
    `;
  pool.query(sqlstatement, id, callback);
};

module.exports.getUserPoints = (id, callback) => {
  const sqlstatement = `
    SELECT SUM(task.points) as points FROM taskprogress
    INNER JOIN users ON taskprogress.user_id = users.id
    INNER JOIN task ON taskprogress.task_id = task.task_id WHERE users.id = ?;
    `;
  pool.query(sqlstatement, id, callback);
};

module.exports.insertSingle = (data, callback) => {
  const sqlstatement = `
    INSERT INTO users (username, email, password) VALUES (?, ?, ?);
    `;
  const values = [data.username, data.email, data.password];
  pool.query(sqlstatement, values, callback);
};

module.exports.updateSingle = (data, callback) => {
  const sqlstatement = `
    UPDATE users SET username = ?, email = ?, password = ?, updated_on = ?, last_login_on = ? WHERE id = ?;
    `;
  const values = [data.username, data.email, data.password, data.updated_on, data.last_login_on, data.id];
  pool.query(sqlstatement, values, callback);
};

module.exports.deleteSingleById = (id, callback) => {
  const sqlstatement = `
    DELETE FROM users WHERE id = ?;
    ALTER TABLE users auto_increment = 1;
    `;
  pool.query(sqlstatement, id, callback);
};

module.exports.selectByNameOrEmail = (data, callback) => {
  const sqlstatement = `
      SELECT * FROM users WHERE username = ? OR email = ?;
      `;
  const values = [data.username, data.email];
  pool.query(sqlstatement, values, callback);
};
