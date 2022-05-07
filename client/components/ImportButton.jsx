// import * as React from 'react';
// import ReactDOM from 'react-dom';
import React, { Component } from 'react';

class ImportButton extends Component {
  constructor(props) {
    super(props);
    this.clickMe = this.clickMe.bind(this);
  }
  
  clickMe() {
    alert('I have been clicked!');
  };
  
  render() {
    return(
      <button onClick={this.clickMe}>
        IMPORT
      </button>
    )
  }
}

export default ImportButton;