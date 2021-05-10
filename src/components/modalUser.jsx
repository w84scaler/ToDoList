import React, { Component } from "react";
import Modal from 'react-modal'
import UserAction from "../action/userAction"
import TaskActiom from "../action/taskAction"

class _ModalUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: "",
            password: ""
        }
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(){
        console.log("login")
        let res = await UserAction.login(this.state.login,this.state.password);
        if(!res){
            alert("invalid login or password")
        }else{
            this.props.closeModal();
            TaskActiom.getTasks([])
        }
    }

    async register(){
        let res = await UserAction
            .register(this.state.login,this.state.password);
        if(!res){
            alert("Login already exists")
        }else{
            this.props.closeModal();
        }
    }

    onChange(event){
        switch(event.target.name){
            case "password":
                this.setState({password : event.target.value});
                break;
            case "login":
                this.setState({login : event.target.value});
                break;     
            default:
                console.log("switch dead")
                break       
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
                contentLabel={this.props.contentLabel}
                appElement={this.props.appElement}
                className="Modal"
                overlayClassName="Overlay"
            >
                <form className="form-group col-7">
                        <h2>{this.props.contentLabel}</h2>
                        <input className = "form-control mb-2" type = "text" name = "login" autoComplete = "off" placeholder = "Login" onChange = {this.onChange} value = {this.state.login} />
                        <input className = "form-control mb-2" type = "password" name = "password" autoComplete = "off" placeholder = "Password" onChange = {this.onChange} value = {this.state.password} />            
                        <button type = "button" className="btn btn-primary mr-2" onClick = {this.login}>Login</button>
                        <button type = "button" className="btn btn-secondary" onClick = {this.props.closeModal}>Cancel</button>   
                </form>                           
               
            </Modal>
        );
    }
}
 
export default _ModalUser;