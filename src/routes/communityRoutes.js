const router = require('express').Router();
const { Snowflake } = require('@theinternetfolks/snowflake');
const Community = require('../models/communityModels');
const Member = require('../models/memberModel');
const User = require('../models/users');
const Role = require('../models/roles');
const authMiddleware = require("../../authenticationMiddleware");
const jwsSigninToken = require("../routes/userRoutes");
const communityController = require('../controllers/communityController');
//create a community
router.post('/community', authMiddleware, communityController.createCommunity);


//get all communities
router.get('/community', communityController.getAll);

//get all members
router.get('/community/:id/members', communityController.getAllMembers);

//get my owned communities
router.get('/me/owner', authMiddleware, communityController.getMyOwnedCommunity);

//get my joined community
router.get('/me/member', authMiddleware, communityController.getMyJoinedCommunity);



module.exports = router;