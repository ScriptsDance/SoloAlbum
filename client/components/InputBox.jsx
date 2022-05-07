import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class InputBox extends Component {
  constructor(props){
    super(props)
    this.state ={
      isLoaded : false,
      tableOutput : ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    const reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = (event) => {
      const data = new Uint8Array(reader.result);;
      const work_book = XLSX.read(data, {type: 'array'});
      const sheet_name = work_book.sheetNames;
      const sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0], {header :1}]);
      if(sheet_data.length > 0){
        let tb = '<table class = "table table-striped table-bordered"/>';
        for(let row = 0; row < sheet_data.length; row++){
          tb += '<tr>';
          for(let col = 0; col < sheet_data[row].length; col++){
            tb += sheet_data[row][col] + '</td>';
          }
          tb += + '</tr>';

        }
        this.setState({tableOutput : tb, isLoaded : true});
      }
    }
  }
  render(){
    return(
      <div>
      <div class = 'card'>
        <div class = 'card-header'> <b>Select Excel File</b></div>
        <div class = 'card-body'><input onChange = {this.handleChange} type="file" id="excel_file" /></div>
      </div>
      <div id = 'excel_data' class='mt-5'> {ReactHtmlParser(this.state.tableOutput)}</div>
      </div>
    )
  }
}
export default InputBox;