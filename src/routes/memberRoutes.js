const { Snowflake } = require('@theinternetfolks/snowflake');
const Member = require('../models/memberModel');
const Community = require('../models/communityModels');
const User = require("../models/users");
const Role = require('../models/roles');
const router = require('express').Router();

router.post('/create', async (req,res)=>{
    try {
        
        const memberSnowflake = Snowflake.generate()

        const { community, user, role } = req.body;

        //check community existance
        const checkCommunity = await Community.findOne({communityId: community});
        if(!checkCommunity){
            return res.status(400).json({error: "community not found"})
        }
        
        //check user existance
        const checkUser = await User.findOne({userId: user});
        if(!checkUser){
            return res.status(400).json({error: "user not found"})
        }
        
        //check if user is already a member
        const isUserAlreadyExist = await Member.exists({community, user});
        if(isUserAlreadyExist){
            return res.status(400).json({error: "user already exists in community"})
        }
        
        //check if the role exists
        const checkRole = await Role.findOne({roleId: role});
        if(!checkRole){
            return res.status(400).json({error: "Role not found"})
        }

        const newMember = new Member({
            memberId: memberSnowflake,
            community,
            user,
            role,
        })

        await newMember.save();

        res.status(200).json(newMember);
    } catch (error) {
        res.status(400).json({error: "internal server error"})
    }
})

module.exports = router;