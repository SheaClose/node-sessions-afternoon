const swag = require('../models/swag');

module.exports = {
  read(req, res) {
    return res.status(200).json(swag);
  }
};
