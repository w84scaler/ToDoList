import React, { Component } from "react";

class StatusFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statuses: []
        };
        this.checkBoxChange = this.checkBoxChange.bind(this)
    }

    checkBoxChange(event){
        let index = this.state.statuses.indexOf(event.target.value);
        if (index !== -1)
            this.state.statuses.splice(index, 1)
        else
            this.state.statuses.push(event.target.value);
        this.props.handler(this.state.statuses);
    }

    render() {
        return (
        <div style={{display: "flex", justifyContent: "center"}} onChange = {this.checkBoxChange}> 
            <div class="custom-control custom-checkbox m-2">
                <input type="checkbox" class="custom-control-input" id="no-progress" value="0"/>
                <label class="custom-control-label" for="no-progress">No progress</label>
            </div>
            <div class="custom-control custom-checkbox m-2">
                <input type="checkbox" class="custom-control-input" id="in-progress" value="1"/>
                <label class="custom-control-label" for="in-progress">In Progress</label>
            </div>
            <div class="custom-control custom-checkbox m-2">
                <input type="checkbox" class="custom-control-input" id="terminated" value="2"/>
                <label class="custom-control-label" for="terminated">Terminated</label>
            </div>
            <div class="custom-control custom-checkbox m-2">
                <input type="checkbox" class="custom-control-input" id="dead" value="3"/>
                <label class="custom-control-label" for="dead">Dead</label>
            </div>
        </div>
    );
  }
}
export default StatusFilter;