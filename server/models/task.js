const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        max: 255
    },
    desc:{
        type: String,
        max: 255
    },
    start_date:{
        type: Date,
        default: Date.now,
    },
    end_date:{
        type: Date,
    },
    status:{
        type: Number,
        default:0,
        min: 0,
        max: 3
    },
    files:{
        type: [String]
    }
});

module.exports = mongoose.model('Task', taskSchema);