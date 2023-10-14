const { Snowflake } = require("@theinternetfolks/snowflake");
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    memberId: {
        type: String,
        unique: true,
        index: true,
    },
    community:{
        type: mongoose.Schema.Types.String,
        ref: 'Community',
    },
    user: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
    },
    role: {
        type: mongoose.Schema.Types.String,
        ref: 'Role',
    },
    createdAt: {
        type: Date,
    }
},
{timestamps: true});

module.exports = mongoose.model('Member', memberSchema);