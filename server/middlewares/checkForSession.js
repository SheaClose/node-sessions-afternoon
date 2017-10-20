module.exports = (req, res, next) => {
  if (req.session.user) return next();
  req.session.user = { username: '', cart: [], total: 0 };
  return next();
};
