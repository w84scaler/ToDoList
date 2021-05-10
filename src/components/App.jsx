import React, { Component } from "react";
import "react-table-6/react-table.css";
import Table from "./table.jsx";
import StatusFilter from './status_filter';
import TaskRedactor from "./task_redactor";
import Navigation from './navigation';
import Store from "../store/taskStore";
import Action from "../action/taskAction";
import ModalUser from "./modalUser"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: Store.getTasks(),
      EditingTask: null
    }
    this._onChange = this._onChange.bind(this);
    this._onEditClick = this._onEditClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this)
  }

  componentWillMount() {
    Action.getTasks([])
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({tasks: Store.getTasks()});
  }

  StatusFilterChange(statuses) {
    Action.getTasks(statuses);
  }

  TableUpdate(){
    Action.getTasks([]);
  }

  _CreateTask(data) {
    Action.createTask(data);
  }

  _DeleteTask(id) {
    Action.deleteTask(id);
  }

  _onEditClick(data) {
    this.setState({
      EditingTask: data
    })
  }

  _EditTask(data) {
    Action.updateTask(data);
  }

  openModal() {
    this.setState({isOpenModal : true})
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("aaaa")
  }
 
  closeModal(){
    this.setState({isOpenModal : false})
  }

  render() {
    return(
      <div>
        <ModalUser
              isOpen={this.state.isOpenModal}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Login"
              closeModal={this.closeModal}
              appElement={document.getElementById('root')}
        >
        </ModalUser>
        <Navigation loginClick={this.openModal}/>
        <Table data = {this.state.tasks} onDelete = {this._DeleteTask} onEditClick = {this._onEditClick} />
        <StatusFilter handler = {this.StatusFilterChange} />
        <TaskRedactor createTask = {this._CreateTask} editTask = {this._EditTask} EditingTask = {this.state.EditingTask} />
      </div>
    )
  }
}

export default App;