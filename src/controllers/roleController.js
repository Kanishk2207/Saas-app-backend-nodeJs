const { Snowflake } = require('@theinternetfolks/snowflake');
const Role = require('../models/roles');


const createRole = async (req,res)=>{
    try {
        
        const { roleName } = req.body;

        const roleSnowflake = Snowflake.generate();

        const adminRoleName = 'community admin';
        const memberRoleName = 'community member';

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
}


const getAllFunc = async (req,res)=>{

    try {
        const allRoles = await Role.find();
    
        res.status(200).json(allRoles);
    } catch (error) {
        res.status(400).json({error: 'internal server error'})
    }
}

module.exports = {
    createRole,
    getAllFunc,
}