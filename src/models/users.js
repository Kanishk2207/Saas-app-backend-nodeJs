const { Snowflake } = require("@theinternetfolks/snowflake");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        index: true,
    },
    userName: {
        type: String,
        maxlength: 64,
        default: null,
    },
    userEmail: {
        type: String,
        maxlength: 128,
        unique: true,
    },
    password: {
        type: String,
        // validate: {
        //     validator: function (value) {
        //       // Define your strong password criteria here
        //       // Example: At least 8 characters with a mix of uppercase, lowercase, digits, and special characters
        //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        //     },
        //     message: 'Password does not meet the criteria for a strong password.',
        //   },
    },
    createdAt: {
        type: Date
    }

},
    { timestamps: true });

module.exports = mongoose.model("User", userSchema);