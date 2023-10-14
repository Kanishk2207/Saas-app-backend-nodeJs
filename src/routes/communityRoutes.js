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
router.post('/create', authMiddleware, communityController.createCommunity);


//get all communities
router.get('/getall', communityController.getAll);

//get all members
router.get('/allmembers', communityController.getAllMembers);

//get my owned communities
router.get('/myOwned', authMiddleware, communityController.getMyOwnedCommunity);

//get my joined community
router.get('/myJoined', authMiddleware, communityController.getMyJoinedCommunity);



module.exports = router;