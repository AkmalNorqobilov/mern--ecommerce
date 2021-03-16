const router = require('express').Router();
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct, getProductsBySlug } = require('../controller/product');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + " - " + file.originalname)
    } 
})

const upload = multer({storage})
// const Product = require('../models/product');

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct)
router.post('/products/:slug', getProductsBySlug);

module.exports = router;