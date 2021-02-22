import DashboardJsx from './Dashboard.jsx';
import AdminBaseComponent from '../../../AdminBaseComponent';
import './Dashboard.scss';


export default class Dashboard extends AdminBaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = DashboardJsx;
    this.state = {
      curItem: {}
    };
  }
  componentDidMount() {
    super.componentDidMount();
   
  }
  render() {
    return this.jsxTemplate.call(this);
  }
}

