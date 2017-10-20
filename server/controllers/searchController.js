const swag = require('../models/swag');

module.exports = {
  search(req, res) {
    const { category } = req.query;
    const catArr = swag.filter(c => c.category == category);
    if (catArr.length) {
      return res.status(200).json(catArr);
    } else return res.status(500).json(swag);
  }
};
