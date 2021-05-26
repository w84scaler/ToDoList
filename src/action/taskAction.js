import Dispatcher from "../dispatcher/dispatcher";
import actionTypes from "./types";
import download from 'js-file-download';
import API from "../api/api";
import { socket } from "../components/App";

var cookie = require('cookie');

const TaskAction = {
    getTasks(status) {
        API.getTasks(status)
        .then(data => {
            Dispatcher.dispatch({
                type: actionTypes.REQUEST_SUCCESS,
                tasks: data
            })
        })
        .catch(error => {
            console.log(error);
        });
    },

    deleteTask(_id){
        checkCookie();
        API.deleteTask(_id)
            .then(data => {
                this.getTasks("");
            })
            .catch(error => {
                console.log(error);
            })
    },

    downloadFile(fileName){
        checkCookie();
        API.downloadFile(fileName)
            .then(data => {
                download(data, fileName.substring(14, fileName.length));
            })
            .catch(error => {
                console.log(error);
            })
    },
    
    createTask(_data){
        console.log(_data)
        checkCookie();
        if(_data.files) {
            _data.filenames = [];
            _data.binfiles = [];
            for (let i = 0; i < _data.files.length; i++) {
                _data.filenames[i] = _data.files[i].name;
                _data.binfiles[i] = _data.files[i];
            }
            _data.files = [];
        }   
        API.createTask(_data)
            .then(res => { 
                this.getTasks("");
            })
    },

    updateTask(data){
        checkCookie();
        this.clearEditingTask();

        data.start_date = new Date(data.start_date);
        data.end_date = new Date(data.end_date);

        if(data.files) {
            data.filenames = [];
            data.binfiles = [];
            for (let i = 0; i < data.files.length; i++) {
                data.filenames[i] = data.files[i].name;
                data.binfiles[i] = data.files[i];
            }
            data.files = [];
        }   
        
        API.updateTask(data)
            .then(() => {
                console.log("update");
                this.getTasks([]);
            })
    },

    choseTaskFromTable(task) {
        Dispatcher.dispatch({
            type: actionTypes.CHOOSE_TASK,
            editingTask: task
        });
    },

    clearEditingTask() {
        Dispatcher.dispatch({
            type: actionTypes.CLEAR_TASK,
        });
    }
}

export default TaskAction;

function checkCookie(){
    if (socket.io.engine.opts.transportOptions.polling.extraHeaders.user_cookie!==document.cookie){
        socket.disconnect().connect();
    }
    
}