const users = require('../models/users');
let id = 1;

module.exports = {
  login(req, res) {
    const { username, password } = req.body;
    const user = users.find(
      cur => cur.username == username && cur.password == password
    );
    if (user) {
      req.session.user.username = username;
      res.status(200).json(req.session.user);
    } else {
      res.status(500).json({ err: 'No user found' });
    }
  },
  register(req, res) {
    const { username, password } = req.body;
    users.push({ username, password, id });
    id++;
    req.session.user.username = username;
    res.status(200).json(req.session.user);
  },
  signout(req, res) {
    req.session.destroy();
    res.status(200).json(req.session);
    return req.session;
  },
  getUser(req, res) {
    let { user } = req.session;
    return res.status(200).json(user);
  }
};
