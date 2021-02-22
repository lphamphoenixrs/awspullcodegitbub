import AdminSidebarJsx from './AdminSidebar.jsx';
import AdminBaseComponent from '../../AdminBaseComponent';
import './AdminSideBar.scss';


export default class AdminSidebar extends AdminBaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = AdminSidebarJsx;
    this.state = {
      curItem: {},
      is_show_sidebar: false,
      is_show_menu: true,
      is_back_menu: true,
      is_hover: false,
      permissions: this.permissions ? this.permissions : []
    };
  }
  componentDidMount() {
    super.componentDidMount();
  }

  /**
     * @description show OR hidden sidebar
     * @author Long.pham 2019-06-14
     */
  showSidebar(isShow, client_id) {
    this.setState({
      is_show_sidebar: isShow ? isShow : false,
      client_id: client_id ? client_id : null
    })
    this.forceUpdate();
  }


  onClickExpendMenu(){
    this.setState({
      is_show_menu: this.state.is_show_menu ? false: true
    }, () => {
      if(!this.state.is_show_menu){
        $("body").addClass("off");
      } else {
        $("body").removeClass("off");
      }
    })
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

