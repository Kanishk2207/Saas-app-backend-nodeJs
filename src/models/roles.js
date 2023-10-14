const { Snowflake } = require("@theinternetfolks/snowflake");
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    roleId: {
        type: String,
        unique: true,
        index: true,
    },
    roleName: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    }
},
    {timestamps: true});

module.exports = mongoose.model("Role", roleSchema);