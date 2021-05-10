const Task = require('../models/Task');

exports.add = async(data) => {
    let files = [];
    data.files.forEach(file => {
        files.push(file.filename);
    })
    const task = new Task({
        name: data.body.name,
        desc: data.body.desc,
        start_date: data.body.start_date,
        end_date: data.body.end_date,
        status: data.body.status,
        files: files
    });

    try {
        const savedTask = await task.save();
        return savedTask;
    }
    catch(err) {
        return null;
    }
}

exports.update = async(data) => {
    let files = [];
    data.files.forEach(file => {
        files.push(file.filename);
    })
    try {
        data.body.files = files;
        const task = await Task.findByIdAndUpdate({_id : data.body.id}, data.body, {upsert: false})
        return task;
    }
    catch(err) {
        return null;
    }
}

exports.list = async() => {
    try {
        const tasks = await Task.find();
        return tasks;
    }
    catch(err) {
        return null;
    }
}

exports.listFilterStatus = async(status) => {
    try {
        const tasks = await Task.find({status: status});
        return tasks;
    }
    catch(err) {
        return null;
    }
}

exports.delete = async(id) => {
    try {
        const task = await Task.findByIdAndRemove({_id: id});
        return true;
    }
    catch(err) {
        return null;
    }
}