// Controller For Token Pre-Generation
module.exports.preTokenGenerate = (req, res, next) => {
  res.locals.userId = req.body.id;
  next();
};

// Controller For Before Sending Token
module.exports.beforeSendToken = (req, res, next) => {
  res.locals.message = `Token is generated.`;
  next();
};

// Controller For Token Verification
module.exports.showTokenVerified = (req, res, next) => {
  res.status(200).json({
    userId: res.locals.userId,
    message: 'Token is verified.',
  });
};

// Controller For Bcrypt Compare
module.exports.showCompareSuccess = (req, res, next) => {
  res.status(200).json({
    message: 'Compare is successful.',
  });
};

// Controller For Bcrypt Pre-Compare
module.exports.preCompare = (req, res, next) => {
  res.locals.hash = req.body.hash;
  next();
};

// Controller For Bcrypt Hashing
module.exports.showHashing = (req, res, next) => {
  res.status(200).json({
    hash: res.locals.hash,
    message: `Hash is successful.`,
  });
};

// Controller For After-SelectAll
module.exports.afterSelectAll = (req, res, next) => {
  res.status(200).json(res.locals.selectAll);
};
