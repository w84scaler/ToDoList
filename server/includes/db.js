const MONGOOSE = require('mongoose');
var taskSchema = require('./schemas/taskSchema');
var userSchema = require('./schemas/userSchema');

const _TASK = MONGOOSE.model('Task', taskSchema.TASK_SCHEMA);
const _USER = MONGOOSE.model('User', userSchema.USER_SCHEMA);

var _connect = function con(){
    MONGOOSE.connect("mongodb://127.0.0.1:27017/todolist",{useNewUrlParser: true, useUnifiedTopology: true}, (error, client)=>{
        if(error){
            console.log(error);
            return;
        }
    });
}

var _disconnect = function discon(){
    MONGOOSE.disconnect();
}

module.exports = {
    connect : _connect,
    disconnect : _disconnect,
    TASK : _TASK,
    USER: _USER
};