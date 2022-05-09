import React from "react";
import {render} from "react-dom";
import App from '../App.jsx';
import { BrowserRouter } from 'react-router-dom';
import styles from "../scss/application.scss";


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

//react 18

