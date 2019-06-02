const express = require('express')
const validade = require('express-validation')
const handle = require('express-async-handler')
const routes = express.Router()
const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.get('/', (req, res) => res.send('Hello World!'));

routes.post(
  '/users',
  validade(validators.User),
  handle(controllers.UserController.store)
)
routes.put('/users/:id', handle(controllers.UserController.update))

routes.post(
  '/sessions',
  validade(validators.Session),
  handle(controllers.SessionController.store)
)

routes.use(authMiddleware)

// Ads
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validade(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put('/ads/:id', handle(controllers.AdController.update))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

// Purchase

routes.post(
  '/purchases',
  validade(validators.Purchase),
  handle(controllers.PurchaseController.store)
)
routes.put('/purchases/:id', handle(controllers.PurchaseController.sale))
module.exports = routes
