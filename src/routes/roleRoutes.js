const router = require('express').Router();
const { Snowflake } = require('@theinternetfolks/snowflake');
const Role = require('../models/roles');
const roleController = require('../controllers/roleController');

router.post('/role', roleController.createRole);

router.get('/role', roleController.getAllFunc);


module.exports = router;