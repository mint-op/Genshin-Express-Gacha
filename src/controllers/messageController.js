const model = require('../models/messageModel');

module.exports.createMessage = (req, res, next) => {
  const data = {
    user_id: res.locals.userId,
    message_text: req.body.message_text,
  };

  if (data.message_text == undefined || data.message_text == '') {
    return res.status(400).json({ Error: 'message_text is undefined' });
  } else if (data.user_id == undefined) {
    return res.status(400).json({ Error: 'user_id is undefined' });
  }

  const callback = (error, results, callback) => {
    if (error) {
      console.error('Error createMessage:', error);
      res.status(500).json(error);
    } else {
      res.status(201).json(results);
    }
  };

  model.insertSingle(data, callback);
};

module.exports.readMessageById = (req, res, next) => {
  const id = req.params.id;

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error readMessageById:', error);
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  };

  model.selectById(id, callback);
};

module.exports.readAllMessage = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error readAllMessage:', error);
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAll(callback);
};

module.exports.updateMessageById = (req, res, next) => {
  const data = {
    id: req.params.id,
    user_id: req.body.user_id,
    message_text: req.body.message_text,
  };

  if (!data.id) {
    return res.status(400).json({ Error: 'id is undefined' });
  } else if (!data.message_text || data.message_text == '') {
    return res.status(400).json({ Error: 'message_text is undefined or empty' });
  } else if (!data.user_id) {
    return res.status(400).json({ Error: 'userId is undefined' });
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error updateMessageById:', error);
    } else {
      res.status(200).json(results);
    }
  };

  model.updateById(data, callback);
};

module.exports.deleteMessageById = (req, res, next) => {
  const id = req.params.id;

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error deleteMessageById:', error);
      res.status(500).json(error);
    } else {
      res.status(204).send();
    }
  };

  model.deleteById(id, callback);
};

module.exports.deleteAllMessageByUser = (req, res, next) => {
  const userId = res.locals.userId;

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error deleteAllMessage:', error);
      res.status(500).json(error);
    } else {
      next();
    }
  };

  model.deleteAllByUser(userId, callback);
};
