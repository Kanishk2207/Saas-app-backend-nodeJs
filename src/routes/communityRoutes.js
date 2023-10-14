const router = require('express').Router();
const { Snowflake } = require('@theinternetfolks/snowflake');
const Community = require('../models/communityModels');
const Member = require('../models/memberModel');
const User = require('../models/users');
const Role = require('../models/roles');
const authMiddleware = require("../../authenticationMiddleware");
const jwsSigninToken = require("../routes/userRoutes");
//create a community
router.post('/create', authMiddleware, async (req, res) => {


    try {

        //generating snowflake
        const communitySnowflake = Snowflake.generate();

        const user = req.user;

        const { communityName, slug } = req.body;

        const existingSlug = await Community.findOne({ slug });

        if (existingSlug) {
            return res.status(400).json({ error: 'slug already taken, please try different slug' });
        }

        const newCommunity = new Community({
            communityId: communitySnowflake,
            communityName,
            slug,
            owner: user.userId,
        });

        await newCommunity.save();
        res.status(200).json(newCommunity);

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "bad request" });
    }

})


//get all communities
router.get('/getall', async (req, res) => {

    console.log(jwsSigninToken);

    try {

        const allCommunities = await Community.find()

        res.status(200).json(allCommunities)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "internal server error" });
    }

})

//get all members
router.get('/allmembers', async (req, res) => {
    try {
        const { community } = req.body;

        const allMembers = await Member.find({ community: 'community' });

        const userIds = allMembers.map(member => member.user);
        const roleIds = allMembers.map(member => member.role);

        const users = await User.find({ userId: { $in: userIds } });
        const roles = await Role.find({ roleId: { $in: roleIds } });

        const userMap = new Map(users.map(user => { user.userId, user.userName }))
        const roleMap = new Map(roles.map(role => { role.roleId, role.roleName }))

        const memberRes = allMembers.map(member => ({
            userId: member.user,
            userName: userMap.get(allMembers.user),
            rolename: roleMap.get(allMembers.role)
        }))

        res.status(200).json(memberRes);

    } catch (error) {
        res.status(400).json({ error: 'internal server error' });
    }


})

//get my owned communities
router.get('/myOwned', authMiddleware, async (req, res) => {
    try {

        const user = req.user;

        const myOwnedCommunnities = await Community.find({ owner: user.userId });

        if (!myOwnedCommunnities.length) {
            return res.status(400).json({ error: "No communitites found" })
        }

        res.status(200).json(myOwnedCommunnities);

    } catch (error) {

    }
})

//get my joined community
router.get('/myJoined', authMiddleware, async (req, res) => {

    try {

        const userId = req.user.userId;
        const roleId = Role.find({ roleName: 'communitymember' });


        const allJoinedMembers = await Member.find({
            user: userId,
            role: roleId,
        })

        const communityIds = allJoinedMembers.map(members => members.community);

        const communities = await Community.find({ communityId: { $in: communityIds } });

        const communityNames = communities.map(community => community.communityName);

        res.status(200).json(communityNames)

    } catch (error) {
        res.status(400).json({error: "internal server error"})
    }
    console.log(allJoinedMembers);

})







module.exports = router;