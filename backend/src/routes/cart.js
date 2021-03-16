const router = require('express').Router();
const slugify = require('slugify');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addItemToCart } = require('../controller/cart');

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart)

module.exports = router;