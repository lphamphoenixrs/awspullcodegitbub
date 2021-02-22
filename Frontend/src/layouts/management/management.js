import React from 'react';
import ReactDOM from 'react-dom';
import AppManagement from './AppManagement';
import registerServiceWorker from './../../registerServiceWorker';
import Translate from './../../utils/Translate';
import Constants from "./../../utils/Constants";
import FLHttp from './../../utils/FLHttp';
import { BrowserRouter } from "react-router-dom";
import Libs from '../../utils/Libs';


var trans = new Translate();
global.trans = trans;
global.globalIdProgress = 0;
var rootDir = __dirname;
global.rootDir = rootDir;
global.Libs = Libs;
global.Constants = Constants;


global.flHttp = FLHttp
ReactDOM.render(
  <BrowserRouter>
    <AppManagement />
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();