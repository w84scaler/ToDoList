const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login:{
        unique: true,
        type: String,
        required: true,
        max: 25
    },
    hash:{
        type: String,
        required: true,
        max: 255
    }
});

module.exports = {
    USER_SCHEMA : userSchema
  };