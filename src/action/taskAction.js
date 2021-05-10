import Dispatcher from "../dispatcher/dispatcher";
import actionTypes from "./types";
var axios = require('axios');

const TaskAction = {

    getTasks(status) {
        Dispatcher.dispatch({
            type: actionTypes.GET_TASKS,
        });
        let url = `http://localhost:3228/api/task?`;
        status.forEach(element => {
            url += ('status=' + element + '&');
        });
        url = url.substring(0, url.length - 1);
        axios.get(url, {withCredentials: true})
            .then(data => {
                Dispatcher.dispatch({
                    type: actionTypes.REQUEST_SUCCESS,
                    tasks: data.data
                })}
            )
            .catch(err =>
                Dispatcher.dispatch({
                    type: actionTypes.REQUEST_FAILURE,
                    //error: err
                })
            );
    },

    createTask(data){
        var formData = new FormData();
        formData.append("name",data.name);
        formData.append("desc",data.desc);
        if (data.start_date !== "")
            formData.append("start_date",new Date(data.start_date));
        if (data.end_date !== "")
            formData.append("end_date",new Date(data.end_date));
        formData.append("status",data.status);
        for (let i = 0; i < data.files.length; i++) {
            formData.append("filedata", data.files[i]);
        }
        axios({
            method: 'post',
            url: 'http://localhost:3228/api/task',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' },
            withCredentials: true
            })
        .then(() =>{
            this.getTasks([])
        })
        .catch(err =>
            console.error(err)
        );
    },

    deleteTask(id){
        axios.delete('http://localhost:3228/api/task/' + id, {withCredentials: true})
        .then(() =>
            this.getTasks([])
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateTask(data){
        console.log(data);
        var formData = new FormData();
        formData.append("id",data.id);
        formData.append("name",data.name);
        formData.append("desc",data.desc);
        formData.append("start_date",new Date(data.start_date));
        if (data.end_date !== undefined)
            formData.append("end_date",new Date(data.end_date));
        formData.append("status",data.status);
        for (let i = 0; i < data.files.length; i++) {
            formData.append("filedata", data.files[i]);
        }
        axios({
            withCredentials: true,
            method: 'put',
            url: `http://localhost:3228/api/task`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
        .then(() => {
            this.getTasks([])
        })
        .catch(err =>
            console.error(err)
        );      
    }
}

export default TaskAction;