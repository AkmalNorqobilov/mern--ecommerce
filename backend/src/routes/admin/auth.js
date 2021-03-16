const express = require('express');
const { signup, signin, signout} = require('../../controller/admin/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');
const {requireSignin} = require('../../common-middleware')
const router = express.Router();

router.post('/admin/signin', validateSigninRequest, isRequestValidated,  signin)
router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/admin/signout', requireSignin, signout)


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({
//         message:"SALOM"
//     })
// })

module.exports = router;