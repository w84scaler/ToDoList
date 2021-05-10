import React, { Component } from 'react';
import Table from "react-table-6";

class _Table extends Component {

    constructor(props){
        super(props);
        this.state = {
          headers : [{
            Header: 'Name',
            accessor: 'name'
            },{
            Header: 'Description',
            accessor: 'desc'
            },{
             Header: 'Start date',
             width: 223,
             accessor: 'start_date'
           },{
             Header: 'End date',
             width: 223,
             accessor: 'end_date'
           },{
             Header: 'Status',
             width: 108,
             accessor: 'status',
             Cell: props  => {
              let str;
              switch (props.original.status){
                 case 0: str = 'No progress';
                 break;
                 case 1: str = 'In progress';
                 break;
                 case 2: str = 'Terminated';
                 break;
                 case 3: str = 'Dead';
                 break;
                 default: str = "bruh";
               }
               return(
                <div>{str}</div>
               )
           }},{
             Header: 'Files',
             accessor: 'files',
             Cell: props => {
               return(
                 <div>
                   {
                     props.original.files.map(file => 
                      <div>
                        <a className="filehrefs" href={`http://localhost:3228/api/file/${file}`}>{file.substring(24, file.length)}</a>
                      </div>
                     )
                   }
                 </div>
               )
             } 
           },{
            Header: 'Action',  
            width: 108,
            Cell: props => {
             return (
                <div>
                  <span className="action" onClick={this._onEditClick.bind(this,props.original)}>
                    Edit
                  </span> <span className="action" onClick={this._onDelete.bind(this,props.original._id)}>
                    Delete
                  </span>
               </div>
             )
            } 
           }]
      }
    }

    _onDelete(id){
      this.props.onDelete(id)
    }

    _onEditClick(data){
      this.props.onEditClick(data)
    }

    render() {
        return (
            <Table 
                data = {this.props.data} 
                columns = {this.state.headers}
                defaultPageSize = {10}
                pageSizeOptions = {[5, 10, 15]}
            /> 
        );
    }
}
export default _Table;