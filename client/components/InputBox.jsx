import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { ExcelRenderer, OutTable } from 'react-excel-renderer';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows:[]
    }
    

    this.fileHandler = this.fileHandler.bind(this);
  }

  fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });               
  }
  

  render() {
    console.log("this.state.cols",this.state.cols);
    console.log("this.state.rows", this.state.rows);
    return (
      <div>
        <form>
          <div class='card'>
            <div class='card-header'> <b>Select Excel File To Import</b></div>
            <input type="file" onChange={this.fileHandler} style={{"padding":"10px"}} />
          </div>
          <div > 
            <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" /></div>

        </form>
      </div> 
    )
  }
}
export default InputBox;