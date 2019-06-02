const Ad = require('../models/Ad')
const User = require('../models/User')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')
const Purchase = require('../models/Purchase')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({ ...req.body, author: req.userId })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json(purchase)
  }

  async sale (req, res) {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
