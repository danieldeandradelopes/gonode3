const Ad = require('../models/Ad')
// const User = require('../models/User')
const Purchase = require('../models/Purchase')

class SaleConfirmed {
  async accept (req, res) {
    const purchase = await Purchase.create({ ...req.body, author: req.userId })

    return res.json(purchase)
  }

  async sale (req, res) {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(purchase)
  }
}

module.exports = new SaleConfirmed()
