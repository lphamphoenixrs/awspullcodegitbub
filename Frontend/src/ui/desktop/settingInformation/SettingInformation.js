import SettingInformationJsx from './SettingInformation.jsx';
import BaseComponent from '../../BaseComponent';
import './SettingInformation.scss';
import Libs from '../../../utils/Libs';
import TimeZoneService from '../../../services/TimeZoneService';
import CountryService from '../../../services/CountryService';
import SiteService from '../../../services/SiteService';
import SiteValidate from '../../../validator/SiteValidate';
import { cloneDeep } from 'lodash-es';

export default class SettingInformation extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = SettingInformationJsx;
    var queryParams = !Libs.isBlank(this.props.baseParam) && !Libs.isObjectEmpty(this.props.baseParam.match.params) ? this.props.baseParam.match.params : {};
    this.state = {
      curItem: {
        id: !Libs.isObjectEmpty(queryParams) ? queryParams.id : null,
        id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null
      },
      listSiteType: [
        { id: 1, 'text': "Solar" },
        { id: 2, 'text': "Thermal" },
        { id: 3, 'text': "Win" },
        { id: 4, 'text': "Cogeneration" },
        { id: 5, 'text': "Remote Meter" },
        { id: 6, 'text': "Self-Consumption" },
        { id: 7, 'text': "Storage" },
        { id: 8, 'text': "Weather Station" }
      ],
      dataListTimeZone: [],
      dataListCountry: [],

      msgErrorGallery: "",
    };


    this.handleInputChange = this.handleInputChange.bind(this);

  }
  componentDidMount() {
    super.componentDidMount();
    this.getListTimeZone();
    this.getListCountry();
    this.getDetailSite();
  }

  /**
   * Get detail site
   * @author long.pham 2020-10-30
   * @param id_site, id_customer
   * @return Object
   */
  getDetailSite() {
    let self = this;
    let curItem = this.state.curItem;
    SiteService.instance.getDashboardDetailSite(curItem, (data) => {
      if (data) {
        curItem = Object.assign({}, data, curItem);
        self.setState({
          curItem: curItem
        });
      }
    });
  }

  /**
  * Get list time zone
  * @author long.pham 2020-10-30
  * @return array
  */

  getListTimeZone() {
    let self = this;
    TimeZoneService.instance.getList({}, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.setState({
          dataListTimeZone: data
        });
      } else {
        self.setState({
          dataListTimeZone: []
        });
      }
    })
  }


  /**
  * Get list country
  * @author long.pham 2020-10-30
  * @return array
  */

  getListCountry() {
    let self = this;
    CountryService.instance.getList({}, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.setState({
          dataListCountry: data
        });
      } else {
        self.setState({
          dataListCountry: []
        });
      }
    })
  }

  /**
    * @description Update multiple gallery
    * @author Long.Pham 2019-05-28
    */
  onFileGalleryChange = (event) => {
    var target = event.target;
    var self = this, { curItem, msgErrorGallery } = this.state;
    var file = target.files[0];
    console.log(file);
    if (file.length <= 0) return;
    if (file.length > Constants.COMMON.LIMIT_IMG) {
      self.toast(trans.translate('message.msg_err_limit_image'), "error");
      return;
    } else {
      var fileName = file.name, fileSize = file.size;
      var checkExtFile = Libs.checkExtensionFile(fileName, 1);
      if (!checkExtFile) {
        msgErrorGallery = trans.translate('message.msg_err_ext_image_file')
      }
      else if (fileSize <= 0) {
        msgErrorGallery = trans.translate('message.msg_err_file_size');
      }
      else if (fileSize > Constants.COMMON.MAX_FILE_SIZE) {
        msgErrorGallery = trans.translate('message.msg_err_max_size_upload');
      }
      console.log(msgErrorGallery);
      if (!Libs.isBlank(msgErrorGallery)) {
        curItem.file_upload = '';
        this.setState({
          msgErrorGallery,
          curItem
        });
        return;
      }
      else {
        this.setState({
          msgErrorGallery: null
        });
      }
      //Read file upload
      var reader = new FileReader();
      reader.onload = function (e) {
        curItem.file_upload = e.target.result;
        curItem.gallery = fileName;
        self.setState({
          curItem
        });
      };
      reader.readAsDataURL(file);

    }
  }

  /** 
     * @description Save info main settings
     * @author Long.Pha, 2020-10-30
    */
  async onSaveAction() {
    let params = cloneDeep(this.state.curItem), self = this;
    if (Libs.isBlank(params.id)) return;
    let v = new SiteValidate();
    let errors = await v.FLValidationAll(params);
    if (errors) {
      setValidateMessage(errors);
      return;
    }

    if (!Libs.isBlank(params.commissioning)) {
      params.commissioning = Libs.convertStr2DateV01(params.commissioning, 'MM-DD-YYYY', '-');
    }

    if (!Libs.isBlank(params.built_since)) {
      params.built_since = Libs.convertStr2DateV01(params.built_since, 'MM-DD-YYYY', '-');
    }

    //remove message validation
    removeAllValidateMessage();
    SiteService.instance.save(params, function (status, data, msg) {
      if (status) {
        self.toast(msg, "info");
      }
      else if (data) {
        setValidateMessage(data);
      }
      else if (!Libs.isBlank(msg)) {
        self.toast(msg, "error");
      }
    });

  }

  handleInputChange(event) {
    let target = event.target;
    let name = target.name;
    let value = target.value
    if (target.type === 'checkbox') {
      value = target.checked ? 1 : 0;
    }
    if (name) {
      let item = this.state.curItem;
      item[name] = value;
      this.setState({ curItem: item });
    }
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

