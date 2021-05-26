const QUERY = require("../includes/queries");
const fs = require('fs');

exports.getTasks = function(socket){
    socket.on("GET_TASKS", function(status, callback) {
        QUERY.getTasks(status)
            .then(data => {
                callback({statusCode: 200, result:data});
            })
            .catch(error => {
                console.log(error);
                callback({ statusCode: 400, msg: "Bad request"})
            })
    })
}

exports.deleteTask = function(socket){
    socket.on("DELETE_TASK", (id, callback, sm) => {
        console.log(id);
        console.log(callback)
        QUERY.deleteTask(id)
            .then(code => {
                callback({statusCode: code});
            })
            .catch(err => {
                console.log(err);
                callback({statusCode: 404});
            })
    })
}

exports.downloadFile= function(socket){
    socket.on("DOWNLOAD_FILE", (fileName, callback) => {
        fs.readFile('./server/files/' + fileName, (err, buff) => {
            if(!err){
                callback({statusCode: 200, result: buff});
            } else {
                callback({ statusCode: 500, msg: 'Enternal server error'})
            }
        });
    })
}

exports.createTask = async function(socket){
    socket.on("CREATE_TASK", (data, callback) => {
        loadFile(data);
        QUERY.insertTask(data)
        .then(code => {
            callback({statusCode: 201});
        })
        .catch(err => {
            console.log(err);
            callback({statusCode: 500});
        });
    }) 
}

exports.updateTask = async function(socket){
    socket.on("UPDATE_TASK", (data, callback) => {
        loadFile(data);
        QUERY.updateTask(data)
            .then(() => {
                callback({ statusCode : 204 });
            })
            .catch(() => {
                callback({ statusCode : 400});
            })
        
    })
}

function loadFile(data){
    if(data.binfiles){
        data.dbfilenames = [];
        for (let i = 0; i < data.binfiles.length; i++){
            data.dbfilenames[i] = Date.now() + '-' + data.filenames[i];
            fs.writeFile('./server/files/' + data.dbfilenames[i] , data.binfiles[i], err => {
                if(err)
                    console.log(err);
            })
        }
    }
}