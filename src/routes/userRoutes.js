const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Snowflake } = require("@theinternetfolks/snowflake");
const authenticationMiddleware = require("../../authenticationMiddleware");
const userController = require('../controllers/userController');

dotenv.config();


//endpoint for signup
router.post('/signup', userController.signUpFunc);


//endpoint for signin
router.get('/signin', userController.signInFunc);

//endpoint for getme
router.get('/me', authenticationMiddleware, userController.getMeFunc);


module.exports = router;