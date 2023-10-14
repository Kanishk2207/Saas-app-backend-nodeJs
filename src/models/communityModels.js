const { Snowflake } = require("@theinternetfolks/snowflake");
const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
    communityId: {
        type: String,
        unique: true,
        index: true,
    },
    communityName: {
        type: String,
        maxlength: 128,
    },
    slug: {
        type: String,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    }
})

module.exports = mongoose.model('Community', communitySchema);