import React from 'react';
import ReactDOM from 'react-dom';
import Forgotpassword from '../../ui/forgotpassword/Forgotpassword';
import registerServiceWorker from '../../registerServiceWorker';
import Translate from '../../utils/Translate';
import Constants from "../../utils/Constants";
import FLHttp from '../../utils/FLHttp';
import 'bootstrap/dist/css/bootstrap.min.css';


var trans = new Translate();
global.trans = trans;
global.globalIdProgress = 0;
var rootDir = __dirname;
global.rootDir = rootDir;
global.Constants = Constants;
global.flHttp = FLHttp;

ReactDOM.render(<Forgotpassword />, document.getElementById('root'));
registerServiceWorker();