const Product = require('../models/product');
const shortid = require('shortid');
const slugify  = require('slugify');
const Category = require('../models/category')
exports.createProduct = (req, res)=>{
    // res.status(200).json({file: req.file, body: req.body})
    const {name, price, quantity, description, category, createdBy} = req.body;
    
    let productPictures = [];
    if(req.files.length > 0){
        productPictures = req.files.map(file=>{
            return {img: file.filename};
        })
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    });

    product.save((error, product) => {
        if(error) return res.status(400).json({error})

        if(product){
            return res.status(201).json({product});
        }
    })
}   

exports.getProductsBySlug = (req, res) => {
    Product.find({category: "600d4cc61070db267cc2d2fe"}).exec((error, data)=>{
        // return res.status(200).json({data})
    })
    const {slug} = req.params;
    Category.findOne({slug: slug}).select('_id').exec((error, category)=>{
        if(error){
            return res.status(400).json({error})
        }
        
        if(category){
            // return res.status(200).json({categories: category})

            Product.find({category: category._id}).exec((error, products) => {
                if(error){
                    return res.status(400).json({error})
                }
                if(products.length > 0){
                    res.status(200).json({
                    products,
                    productsByPrice:{
                        under1M: products.filter(product=> product.price<=1000000),
                        under2M: products.filter(product=>product.price>1000000 && product.price<=2000000),
                        under4M: products.filter(product=>product.price>2000000 && product.price<=4000000),
                        under7M: products.filter(product=>product.price>4000000 && product.price<=7000000),
                        under10M: products.filter(product=>product.price>7000000 && product.price<=10000000),
                        under15M: products.filter(product=>product.price>10000000 && product.price<=15000000),
                    }
                })

                }
            })
        }
    })
}