import React, { Component } from "react";
import UserAction from "../action/userAction";

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.logout = this.logout.bind(this)
    }

    async logout(){
        await UserAction.logout()
    }

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <a class="navbar-brand" href="http://localhost:3000/">TODOList</a>
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <button class="btn nav-link">Add task</button>
                        </li>
                    </ul>
                </div>  
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <button class="btn nav-link" onClick={this.props.loginClick}>Login</button>
                        </li>
                        {/*<li class="nav-item">
                            <button class="btn nav-link">Register</button>
                        </li>*/}
                        <li class="nav-item">
                            <button class="btn nav-link" onClick={this.logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
    );
  }
}
export default Navigation;