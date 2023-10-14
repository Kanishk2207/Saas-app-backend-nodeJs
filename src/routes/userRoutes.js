const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Snowflake } = require("@theinternetfolks/snowflake");
const authenticationMiddleware = require("../../authenticationMiddleware");

dotenv.config();


//endpoint for signup
router.post('/signup', async (req, res) => {
    try {

        const { userName, userEmail, password } = req.body;

        // generating snowflake token
        const userSnowflake = Snowflake.generate();

        // check if the user exist
        const existingUser = await User.findOne({ userEmail });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating and saving new user
        const newUser = new User({
            userId: userSnowflake,
            userName,
            userEmail,
            password: hashedPassword,
        });
        await newUser.save();


        // generate JWT token for user
        const token = jwt.sign({ userId: newUser.userId }, process.env.JWT_SECRETE);

        res.status(200).json({ token, userId: newUser.userId, username: newUser.userName, email: newUser.userEmail });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


//endpoint for signin
router.get('/signin', async (req, res) => {
    try {

        const { userEmail, password } = req.body;

        // check the user
        const checkUser = await User.findOne({ userEmail });

        if (!checkUser) {

            return res.status(400).json("user not found");

        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {

            return res.status(400).json("invalid Password");

        }


        const token = jwt.sign({ userId: checkUser.userId }, process.env.JWT_SECRETE);


        res.status(200).json({ token, userId: checkUser.userId, username: checkUser.userName, email: checkUser.userEmail });

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//endpoint for getme
router.get('/getme', authenticationMiddleware, async(req,res)=>{

    const authUser = req.user;
    console.log(authUser);

    res.status(200).json({
        email: authUser.userEmail,
        name: authUser.userName,
        ID: authUser.userId
    })

})


module.exports = router;