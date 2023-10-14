const { Snowflake } = require('@theinternetfolks/snowflake');
const Member = require('../models/memberModel');
const Community = require('../models/communityModels');
const User = require("../models/users");
const Role = require('../models/roles');
const authMiddleware = require('../../authenticationMiddleware');
const router = require('express').Router();


//create members
router.post('/create',authMiddleware, async (req,res)=>{
    try {
        
        const memberSnowflake = Snowflake.generate()

        const { community, user, role } = req.body;

        // check if the user is admin
        authUser = req.user.userId;
        adminRole = '7118363940010907780'
        const isAdmin = await Member.exists({community, authUser , adminRole })
        if(!isAdmin){
            return res.status(400).json({error: 'only admins can add members'})
        }

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

//delete members
router.delete('/delete', authMiddleware, async (req, res)=>{
    try {
        
        const { memberId } = req.body;
        const member = Member.findOne({memberId: memberId});

        const community = member.community;
        const authUser = req.user.userId;
        const adminRole = await Role.findOne({roleName: 'commmunity admin'});
        const adminRoleId = adminRole.roleId;
        const isAdmin = await Member.exists({community, authUser , adminRoleId });
        if(!isAdmin){
            return res.status(400).json({error: 'only admins can remove members'});
        }

        await Member.findOneAndDelete({memberId: memberId});

        res.status(200).json('user deleted successfully');

    } catch (error) {
        res.status(400).json({error: 'internal server error'});
    }
})



module.exports = router;