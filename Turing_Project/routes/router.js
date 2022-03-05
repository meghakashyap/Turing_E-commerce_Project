const express =require('express');
const router = express.Router();

const knex = require('../controler/connection');

require('../models/department')(knex,router)
require('../models/attributes')(knex,router)
require('../models/categories')(knex,router)
require('../models/customers')(knex,router)
require('../models/products')(knex,router)
require('../models/review')(knex,router)
require('../models/tax')(knex,router)
require('../models/shipping')(knex,router)
require('../models/orders')(knex,router)
require('../models/shoppingcart')(knex,router)
require('../models/stripe')(knex,router)


module.exports=router;