const express = require('express');
const { signup, signin} = require('../controller/auth');
const { isRequestValidated,  validateSignupRequest, validateSigninRequest } = require('../validators/auth');
const router = express.Router();

router.post('/signin', validateSigninRequest, isRequestValidated, signin)
router.post('/signup', validateSignupRequest, isRequestValidated, signup)


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({
//         message:"SALOM"
//     })
// })

module.exports = router;