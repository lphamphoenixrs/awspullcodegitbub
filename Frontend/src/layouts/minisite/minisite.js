import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import MiniApp from './MiniApp';
import registerServiceWorker from '../../registerServiceWorker';
import Translate from '../../utils/Translate';
import Constants from "../../utils/Constants";
import FLHttp from '../../utils/FLHttp';
import 'bootstrap/dist/css/bootstrap.css';
import './../../scss/layouts/home/App.scss';


var trans = new Translate();
global.trans = trans;
global.globalIdProgress = 0;
var rootDir = __dirname;
global.rootDir = rootDir;
global.Constants = Constants;
global.flHttp = FLHttp;

ReactDOM.render(
    <BrowserRouter>
    <MiniApp />
  </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();