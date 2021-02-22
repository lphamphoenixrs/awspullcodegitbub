/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import MapJsx from './Map.jsx';
import AdminBaseComponent from '../../../AdminBaseComponent';
import SiteService from '../../../../services/SiteService';
import './Map.scss';
import Libs from '../../../../utils/Libs.js';

export default class Map extends AdminBaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = MapJsx;
    this.state = {
      showInfoWindow: false,
      showIconHover: false,
      curItem: {},
      dataList: []
    };
  }
  componentDidMount() {
    super.componentDidMount();
    this.getAllSiteByEmployee();
  }

  /**
   * Get all site by id_employee
   * @author long.pham 2021-01-14
   * @param id_employee, id_sites if null get all
   */
  getAllSiteByEmployee() {
    var id_sites = this.admin.id_sites;
    var list_sites = [];
    if (!Libs.isBlank(id_sites)) {
      var sites = id_sites.split(",");
      if (sites.length > 0) {
        for (var i = 0; i < sites.length; i++) {
          var item = {
            id: sites[i]
          };
          list_sites.push(item);
        }
      }
    }

    let self = this, params = {
      id_employee: this.admin.id_user,
      id_sites: Libs.isArrayData(list_sites) ? list_sites : null
    };

    SiteService.instance.getAllSiteByEmployee(params, (data, total_row) => {
      console.log(data);
      if (Libs.isArrayData(data)) {
        self.setState({ dataList: data });
      } else {
        self.setState({ dataList: [] });
      }
    })
  }

  handleMouseOver = (marker, event) => {
    this.setState({
      showInfoWindow: marker
    });
  };
  handleMouseExit = (marker, event) => {
    this.setState({
      showInfoWindow: false
    });
  };

  onMouseoverMarker = (marker, event) => {
    this.setState({
      showIconHover: marker
    });
  };

  mouseMoveOutOfMarker = (marker, event) => {
    this.setState({
      showIconHover: false
    });
  };

  render() {
    return this.jsxTemplate.call(this);
  }
}

