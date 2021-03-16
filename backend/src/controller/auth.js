const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {validationResult}  = require('express-validator')

exports.signup=(req, res)=>{


    User.findOne({email: req.body.email})
    .exec(async (error, user) => {
        if(user){
            return res.status(400).json({
                message:"User already registered"
            });
        }
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const _user = new User({
            firstName,
            lastName,
            email,
            password_hash,
            userName:Math.random().toString()
        })
        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }
            if (data) {
                return res.status(201).json({
                    message:"User created success"
                })
            }
        })
    })
}

exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id, role: user.role} , process.env.JWT_SECRET, {expiresIn:'24h'});
                const {_id, firstName, lastName,  email, role, fullName} = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                })
            }else{
                console.log(user, token);
                return res.status(400).json({
                    message: "Invalid password"
                })
            }
        }else{
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
    })
}
