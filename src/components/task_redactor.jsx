import React, { Component } from "react";

class TaskRedactor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            id: 0,
            name: "",
            desc: "",
            start_date: "",
            end_date: "",
            status: 0,
            files: []
        };
        this.NameChange = this.NameChange.bind(this);
        this.DescChange = this.DescChange.bind(this);
        this.StartDateChange = this.StartDateChange.bind(this);
        this.EndDateChange = this.EndDateChange.bind(this);
        this.StatusChange = this.StatusChange.bind(this);
        this.FilesChange = this.FilesChange.bind(this);
        this.SaveButtonClick = this.SaveButtonClick.bind(this)
        this.CancelButtonClick = this.CancelButtonClick.bind(this)
    }

    componentDidUpdate() {
        if (this.props.EditingTask !== null && !this.state.editing)
            this.setState({
                id: this.props.EditingTask._id,
                name: this.props.EditingTask.name,
                desc: this.props.EditingTask.desc,
                start_date: this.formatDate(this.props.EditingTask.start_date),
                end_date: this.formatDate(this.props.EditingTask.end_date),
                status: this.props.EditingTask.status,
                editing: true
            })
    }

    formatDate(unformated) {
        if (unformated !== undefined) {
            let formated = new Date(unformated).toISOString();
            formated = formated.substring(0, formated.length - 8);
            return formated;
        }
        return undefined;
    }

    NameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    DescChange(event) {
        this.setState({
            desc: event.target.value
        })
    }

    StartDateChange(event) {
        this.setState({
            start_date: event.target.value
        })
    }

    EndDateChange(event) {
        this.setState({
            end_date: event.target.value
        })
    }

    StatusChange(event) {
        this.setState({
            status: event.target.selectedIndex - 1
        })
    }

    FilesChange(event) {
        this.setState({
            files: event.target.files
        })
    }

    SaveButtonClick() {
        if (this.state.editing)
            this.props.editTask(this.state);
        else
            this.props.createTask(this.state);
    }

    CancelButtonClick() {
        this.setState({
            editing: false,
            name: "",
            desc: "",
            start_date: "",
            end_date: "",
            status: 0,
            files: []
        })
    }

    render() {
        console.log(this.state.files)
        let files = "Choose files"
        if (this.state.files.length !== 0) {
            files = ""
            Array.from(this.state.files).forEach(file => {
                files += file.name + ", " 
            })
            files = files.substring(0, files.length - 2)
        }
        return (
        <div>
            <div className="col-3 mb-2">
                <input className = "form-control mb-2" type = "text" name = "name" autoComplete = "off" placeholder = "Name" onChange = {this.NameChange} value = {this.state.name} />
            </div>

            <div className="col-3 mb-2">
                <input className = "form-control mb-2" type = "text" name = "name" autoComplete = "off" placeholder = "Description" onChange = {this.DescChange} value = {this.state.desc} />           
            </div>
            
            <div className="col-3" style={{display: "flex", justifyContent: "space-between"}}>
                <label style={{width: "calc(50% - .25rem)"}}>Start Date
                    <input className="form-control" type = "datetime-local" onChange = {this.StartDateChange} value = {this.state.start_date} />
                </label>
                <label style={{width: "calc(50% - .25rem)"}}>End Date
                    <input className="form-control" type = "datetime-local" onChange = {this.EndDateChange} value = {this.state.end_date} />
                </label>
            </div>
            
            <div className="col-3 mb-2">
                <select className="custom-select" onChange = {this.StatusChange} >
                    <option value="" disabled selected style={{ display: "none" }}>Select status</option>
                    <option>No progress</option>
                    <option>In progress</option>
                    <option>Terminated</option>
                    <option>Dead</option>
                </select>
            </div>

            <div className="col-3 mb-2">
                <div className="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile02" multiple onChange = {this.FilesChange}/>
                    <label class="custom-file-label" for="inputGroupFile02">{files}</label>
                </div>
            </div>

            <div className="col-3 mb-2">
                <button type = "button" className="btn btn-primary mr-2" onClick = {this.SaveButtonClick}>Save</button>
                <button type = "button" className="btn btn-secondary" onClick = {this.CancelButtonClick}>Cancel</button>
            </div>
        </div>
    );
  }
}
export default TaskRedactor;