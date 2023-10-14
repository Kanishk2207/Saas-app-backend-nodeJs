const router = require('express').Router();
const { Snowflake } = require('@theinternetfolks/snowflake');
const Role = require('../models/roles');

router.post('/create', async (req,res)=>{
    try {
        
        const { roleName } = req.body;

        const roleSnowflake = Snowflake.generate();

        const adminRoleName = 'commmunity admin';
        const memberRoleName = 'commmunity member';

        const existingRole = await Role.findOne({roleName});

        if(roleName != adminRoleName && roleName != memberRoleName){
            return res.status(402).json('rolename can only be '+ adminRoleName + ' or ' + memberRoleName);
        }

        if(existingRole){
            return res.status(400).json('rolename already exist');
        }

        const newRole = new Role({

            roleId: roleSnowflake,
            roleName

        });
        newRole.save();

        res.status(200).json(newRole);

    } catch (error) {
        console.log(error);
        return res.status(400).json({error: 'internal server error'});
    }
})


module.exports = router;