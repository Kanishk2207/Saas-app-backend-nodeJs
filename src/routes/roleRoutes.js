const router = require('express').Router();
const { Snowflake } = require('@theinternetfolks/snowflake');
const Role = require('../models/roles');
const roleController = require('../controllers/roleController');

router.post('/create', roleController.createRole);

router.get('/getall', roleController.getAllFunc);


module.exports = router;