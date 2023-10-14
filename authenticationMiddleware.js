const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./src/models/users');

module.exports = async (req, res , next)=>{

    const token = req.header('Authorization');

    if(!token){
        return res.status(400).json({error: "Access denied. No token provided"});
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);

        const user = await User.findOne({userId: decoded.userId});
        // console.log(user);
        if(!user){
            return res.status(400).json({error: 'invalid token'});
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }


}

// module.exports = { authorizedUser };