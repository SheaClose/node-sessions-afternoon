const swag = require('../models/swag');

module.exports = {
  add(req, res) {
    const { id } = req.query;
    const { user } = req.session;
    const index = user.cart.findIndex(item => item.id == id);
    if (index === -1) {
      const item = swag.find(swag => swag.id == id);
      user.cart.push(item);
      user.total += item.price;
      return res.status(200).json(user);
    } else {
      res.status(200).json(user);
    }
  },
  delete(req, res) {
    const { id } = req.query;
    const { user } = req.session;
    const index = user.cart.findIndex(item => item.id == id);

    const price = user.cart.splice(index, 1)[0].price;
    console.log(price);
    user.total -= price;
    res.status(200).json(user);
  },
  checkout(req, res) {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;
    res.status(200).json(user);
  }
};
