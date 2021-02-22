import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './../../registerServiceWorker';
import Translate from './../../utils/Translate';
import Constants from "./../../utils/Constants";
import FLHttp from './../../utils/FLHttp';
import { BrowserRouter } from "react-router-dom";


var trans = new Translate();
global.trans = trans;
global.globalIdProgress = 0;
var rootDir = __dirname;
global.rootDir = rootDir;

global.Constants = Constants;


global.flHttp = FLHttp
ReactDOM.render(
    <BrowserRouter>
    <App />
  </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();