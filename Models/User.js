const mongoose = require('mongoose');
const { Schema } = mongoose;

// Creating a schema for user
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    date: {
        type: Date,
        default: Date.now
    }
})

// Exporting the model
const User = mongoose.model("user", UserSchema);
// User.createIndexes();
module.exports = User;