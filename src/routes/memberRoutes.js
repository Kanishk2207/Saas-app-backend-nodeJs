const { Snowflake } = require('@theinternetfolks/snowflake');
const Member = require('../models/memberModel');
const Community = require('../models/communityModels');
const User = require("../models/users");
const Role = require('../models/roles');
const authMiddleware = require('../../authenticationMiddleware');
const router = require('express').Router();
const memberController = require('../controllers/memberController');


//create members
router.post('/create',authMiddleware, memberController.createMember);

//delete members
router.delete('/delete', authMiddleware, memberController.deleteMember);

module.exports = router;