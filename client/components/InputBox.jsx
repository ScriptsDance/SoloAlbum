import React, { Component } from 'react';
import { ExcelRenderer, OutTable } from 'react-excel-renderer';
import ImportButton from './ImportButton.jsx';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: []
    }


    this.fileHandler = this.fileHandler.bind(this);
  }

  fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });
  }


  render() {
    console.log("this.state.cols", this.state.cols);
    console.log("this.state.rows", this.state.rows);
    return (
      <div id="inputAndImport">

        <div class='card' id="inputBoxCard">
          <div class='card-header'> <b>Select Excel File To Import</b></div>
          <input type="file" onChange={this.fileHandler} style={{ "padding": "10px" }} />
          <div > <OutTable class="table" data={this.state.rows} columns={this.state.cols} tableHeaderRowClass="heading" /></div>
        </div>
        {/* add import button here because we want to pass the props from inputbox to importbutton */}
        <div id="importButton">
          <ImportButton userInputSongs={this.state.rows} />
        </div>

      </div>
    )
  }
}
export default InputBox;
