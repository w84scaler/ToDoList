const DAO = require('../includes/db');

exports.getTasks = async function(_status){
    //return await DAO.TASK.find(_status ? {status : _status} : {})
    return await DAO.TASK.find()
    .then(rows => {
        return rows;
    })
    .catch(err => {
        console.log(err);
        return;
    });
}

exports.deleteTask = async function(id){
    return await DAO.TASK.deleteOne({_id : id})
        .then(()=>{
            return 204;
        })
        .catch(err =>{
            throw err;
        });
}

exports.insertTask = async function(data){
    let task = new DAO.TASK({
        status : data.status,
        start_date : data.start_date,
        end_date : data.end_date,
        name : data.name,
        desc: data.desc,
        files : data.dbfilenames,
    });
    return await task.save()
            .then(obj => {
                return 201
            })
            .catch(err => {
                console.log(err);
                throw 500;
            }); 
}

exports.updateTask = async function(data, _fileName){
    let d = new Date(Date.parse(data.end_date));
    let s = new Date(Date.parse(data.start_date));
    return await DAO.TASK.findByIdAndUpdate(data.id, {
        "$set": {
            "name": data.name, "desc" : data.desc , "files": data.dbfilenames,
            "status": data.status, "end_date": d,
            "start_date": s
        }
    },
        { new: true })
        .then(obj => {
            return 201;
        })
        .catch(err => {
            console.log(err);
            return 400;
        });
}

exports.findUserByLogin = async function findUserByLogin(_login){
    return DAO.USER.find({ login: _login })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500)
        });
}

exports.addNewUser = async function addNewUser(login, hashedPassword, salt){
        let newUser = new DAO.USER({
            login : login,
            password: hashedPassword,
            salt: salt
        });
        return newUser.save()
                .then(obj => {
                    return obj;
                })
                .catch(err => {
                    console.log(err);
                }); 
}