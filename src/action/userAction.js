import Dispatcher from "../dispatcher/dispatcher";
import actionTypes from "./types";
var axios = require('axios');

const userAction = {

    login(login, password){
        return axios.post('http://localhost:3228/user/login', {login : login, password: password}, {withCredentials: true})
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err)
        });
    },

    /*register(login, password){
        return axios.post('http://localhost:3228/user/register', {login : login, password: password}, {withCredentials: true})
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err)
        });
    },*/

    logout(){
        return axios.post('http://localhost:3228/user/logout',{}, {withCredentials: true})
        .then(()=>Dispatcher.dispatch({
            type: actionTypes.REQUEST_FAILURE,
            //error: err
        }))
    }
}

export default userAction;