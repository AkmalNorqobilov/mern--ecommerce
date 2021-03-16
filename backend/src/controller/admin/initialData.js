const Category = require('../../models/category');
const Product = require('../../models/product');
const {createCategories} = require('../category')

exports.initialData = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Product.find({}).select('_id name category slug description price productPictures')
    .populate({path: 'category', select: '_id name'}).exec();
    res.status(200).json({
        categories: createCategories(categories),
        products
    })
}