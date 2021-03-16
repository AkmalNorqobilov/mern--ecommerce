const router = require('express').Router();
const Category = require('../models/category')
const slugify = require('slugify')


function createCategories(categories, parentId=null){
    let category;
    const categoryList = [];
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name:cate.name,
            slug:cate.slug,
            type: cate.type,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        } )
    }
    return categoryList;
}
exports.addCategory = (req, res)=>{
    console.log(req.body);
    const categoryObj = {
        name:req.body.name,
        slug: slugify(req.body.name),
    }
    
    if(req.file){
        categoryObj.categoryImage = process.env.API+'/' + req.file.filename
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category)=>{
        if (error) {
            return res.status(400).json({error});
        }
        if (category) {
            return res.status(201).json({category});
        }
    })
}

exports.getCategories = (req, res)=>{
    Category.find({})
    .exec((error, categories)=>{
        if(error) return res.status(400).json({error});

        if(categories) {
            const categoryList = createCategories(categories);
            return res.status(200).json({categoryList});
        }
    })
}

exports.updateCategories = (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];

    if(name instanceof Array){
        for(let i = 0; i<name.length; i++){
            const category = {
                name: name[i],
                type: type[i]
            }
            if(parentId !== "")
                category.parentId = parentId[i];
            const updatedCategory = Category.findOneAndUpdate({_id}, category, {new: true});
            updatedCategories.push(updatedCategory)
        }
    }
    return res.status(201).json({body: req.body});
}
exports.createCategories = createCategories;