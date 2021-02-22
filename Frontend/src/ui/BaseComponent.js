import React, {
    Component
} from 'react'
import { toast } from 'react-toastify';
import Libs from '../utils/Libs';
import Constants from '../utils/Constants';

export default class BaseComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMode: Constants.SCREEN_MODE.VIEW, // mode cập nhật hoặc edit 
            showTransLateModal: false, // trạng  thái show/hide form dịch 
            clear: true,
            defaultEntity: {},
            oldItem: {}
        }
        this.defaultFieldId = "id";
        this.defaultFieldName = "name";
        this.jsxTemplate = function () { };
        this.isSearching = false;
        this.currentSearchingParam = {};
        this.searchParam = {}
        this.setUserPermission();
        if (this.constructor === BaseComponent) {
            // Error Type 1. Abstract class can not be constructed.
            throw new TypeError("Can not construct abstract class.");
        }

    }

    /**
     * @description default function reactJS
     * @author Long.Pham
     */
    render() {
        return this.jsxTemplate.call(this);
    }

    componentDidMount() {
        this.showSidebar();
    }

    /**
     * @description show Or hidden menu client sidebar
     * @author Long.Pham 2010-06-14
     */
    showSidebar() {
        var client_id = (!Libs.isBlank(this.props.baseParam) && !Libs.isBlank(this.props.baseParam.match.params.id)) ? this.props.baseParam.match.params.id : null
        if (this.props.parent && typeof this.props.parent.showSidebarClient === 'function') {
            this.props.parent.showSidebarClient(this.props.is_show_sidebar,client_id );
        }
    }


    clearItem(clear) {
        const value = typeof clear === 'boolean' ? clear : true;
        this.setState({
            clear: value
        });
    }


    /**
     * set user info param and set user permission
     */
    setUserPermission() {
        let info = localStorage.getItem(Constants.COMMON.USER_INFO);
        let userInfo = JSON.parse(Libs.base64Decrypt(info));
        if (Libs.isObjectEmpty(info)) {
            window.location.href = Constants.FRONT_SITE_URL.LOGIN;
            return;
        }

        this.user = userInfo;
    }

    /**
     * focus event category right form first text
     * @param event 
     */
    focusEvent(event) {
        // this.changeModeScreen(event);
        setTimeout(function () {
            $(".fd-form :input").each(function () {
                if (this.type == 'text' && !this.disabled) {
                    this.focus();
                    return false;
                }
                setTimeout(function () {
                    if ($('body').find('.validate-message')) {
                        $('.validate-message').remove();
                    }
                }, 5);
            });
        });
    }
    /**
     * trigger set selected value for select item
     * @param {string} id 
     */
    triggerChangeSelect2(id) {
        $('#' + id).trigger('change');
    }
    /**
     * reset control, class extent defined detail function 
     * excute function if exist after change screen mode
     */
    resetSelect2() {
    }

    /**
     * Set default value to input
     * excute function if exist after change screen mode
     */
    setResetDefaultValue() {
    }

    /**
     * @description Them tam thoi, cho co component select
     * @param {array} data 
     * @author: Long.Pham
     */
    createOptionElement(data, defaultOption) {
        var options = null;
        if ((data instanceof Array)) {
            options = data.map((item, index) => {
                if (item.hasOwnProperty('id') && item.hasOwnProperty('text')) {
                    return (
                        <option key={index + 1} value={item.id}>{item.text}</option>
                    )
                }
            });
            if (!defaultOption && options.length > 0) {
                options.unshift(<option key={0}></option>)
            }
        }
        return options;
    }

    /**
     * @description bind options of DDL
     * @param {Array} data 
     */
    buildOptionElement(data) {
        if ((data instanceof Array) === false || data.length == 0) {
            return null;
        }
        return (
            data.map((item, index) => {
                return (
                    <option key={index + 1} value={item.id}>{item.name}</option>
                )
            })
        )
    }

    /**
     * @description bind options of DDL
     * @param {Array} data 
     */
    buildOptionElementAllocateField(data, id = false, name = false) {
        if ((data instanceof Array) === false || data.length == 0) {
            return null;
        }
        if (!id || !name)
            return null;
        return (
            data.map((item, index) => {
                return (
                    <option key={index + 1} value={item[id]}>{item[name]}</option>
                )
            })
        )
    }


    /**
    * @author Long.Pham
    */
    dataListMonthFilter() {
        return [
            { id: 2, text: trans.translate('common.3month') },
            { id: 5, text: trans.translate('common.6month') },
            { id: 8, text: trans.translate('common.9month') },
            { id: 11, text: trans.translate('common.12month') },
            { id: 23, text: trans.translate('common.24month') }
        ];
    }



    /**
    * @author Long.Pham
    */
    dataDirection() {
        return [
            { id: 0, text: trans.translate('common.khong_xac_dinh') },
            { id: 1, text: trans.translate('common.dong') },
            { id: 2, text: trans.translate('common.tay') },
            { id: 3, text: trans.translate('common.nam') },
            { id: 4, text: trans.translate('common.bac') },
            { id: 5, text: trans.translate('common.tay_bac') },
            { id: 6, text: trans.translate('common.dong_nam') },
            { id: 7, text: trans.translate('common.tay_nam') },
            { id: 8, text: trans.translate('common.dong_bac') }
        ];
    }

    /**
     * @author Long.Pham
     */
    createTransactionStatus() {
        return [
            { id: 1, text: trans.translate('common.transatraction_status1') },
            { id: 2, text: trans.translate('common.transatraction_status2') },
            { id: 3, text: trans.translate('common.transatraction_status3') },
            { id: 4, text: trans.translate('common.transatraction_status4') }
        ];
    }

    /**
     * @author Long.Pham
     */
    createCustomerStatus() {
        return [
            { id: 1, text: trans.translate('common.customer_status1') },
            { id: 2, text: trans.translate('common.customer_status2') },
            { id: 3, text: trans.translate('common.customer_status3') },
            { id: 4, text: trans.translate('common.customer_status4') },
            { id: 5, text: trans.translate('common.customer_status5') },
            { id: 6, text: trans.translate('common.customer_status6') }
        ];
    }

    /**
    * @author Long.Pham
    */
    dataStreetBeforeHouse() {
        return [
            { id: 0, text: trans.translate('common.khong_xac_dinh') },
            { id: 1, text: trans.translate('common.hem_xe_hoi') },
            { id: 2, text: trans.translate('common.dai_lo') },
            { id: 3, text: trans.translate('common.huong_lo') },
            { id: 4, text: trans.translate('common.quoc_lo') },
            { id: 5, text: trans.translate('common.hem_be_tong') },
            { id: 6, text: trans.translate('common.hem_nho') }
        ];
    }

    /**
        * @author Long.Pham
        */
    dataTimeWeek() {
        return [
            { id: 1, text: trans.translate('common.week1') },
            { id: 2, text: trans.translate('common.week2') },
            { id: 3, text: trans.translate('common.week4') },
            { id: 4, text: trans.translate('common.week8') }
        ];
    }


    /**
     * @author Long.Pham
     */
    createGenderList() {
        return [
            { id: 1, text: trans.translate('gender.male') },
            { id: 2, text: trans.translate('gender.female') },
            { id: 3, text: trans.translate('gender.unknown') }
        ];
    }



    /**
     * @author Long.Pham
     */
    createRentListPrice() {
        return [
            { id: 1, text: trans.translate('POST.rent_search_price1') },
            { id: 2, text: trans.translate('POST.rent_search_price2') },
            { id: 3, text: trans.translate('POST.rent_search_price3') },
            { id: 4, text: trans.translate('POST.rent_search_price4') },
            { id: 5, text: trans.translate('POST.rent_search_price5') },
            { id: 6, text: trans.translate('POST.rent_search_price6') },
            { id: 7, text: trans.translate('POST.rent_search_price7') },
            { id: 8, text: trans.translate('POST.rent_search_price8') },
            { id: 9, text: trans.translate('POST.rent_search_price9') },
            { id: 10, text: trans.translate('POST.rent_search_price10') },
            { id: 11, text: trans.translate('POST.rent_search_price11') }
        ];
    }

    /**
     * @author Long.Pham
     */
    createSellListPrice() {
        return [
            { id: 1, text: trans.translate('POST.sell_search_price1') },
            { id: 2, text: trans.translate('POST.sell_search_price2') },
            { id: 3, text: trans.translate('POST.sell_search_price3') },
            { id: 4, text: trans.translate('POST.sell_search_price4') },
            { id: 5, text: trans.translate('POST.sell_search_price5') },
            { id: 6, text: trans.translate('POST.sell_search_price6') },
            { id: 7, text: trans.translate('POST.sell_search_price7') },
            { id: 8, text: trans.translate('POST.sell_search_price8') },
            { id: 9, text: trans.translate('POST.sell_search_price9') },
            { id: 10, text: trans.translate('POST.sell_search_price10') }
        ];
    }

    /**
     * @author Long.Pham
     */
    createArea() {
        return [
            { id: 1, text: trans.translate('POST.area1') },
            { id: 2, text: trans.translate('POST.area2') },
            { id: 3, text: trans.translate('POST.area3') },
            { id: 4, text: trans.translate('POST.area4') },
            { id: 5, text: trans.translate('POST.area5') },
            { id: 6, text: trans.translate('POST.area6') },
            { id: 7, text: trans.translate('POST.area7') },
            { id: 8, text: trans.translate('POST.area8') },
            { id: 9, text: trans.translate('POST.area9') },
            { id: 10, text: trans.translate('POST.area10') }
        ];
    }

    /**
     * Create list news status
     * @author Long.Pham 2019-09-10
     */
    createListStatusNewsLand() {
        /*
        -1: Chờ duyệt, 
        1: Tin được đăng, 
        2: Tin lưu nháp, 
        3: Tin bị khoá
        4: Tin không được duyệt
        */
        return [
            { id: -1, text: trans.translate('POST.status1') },
            { id: 1, text: trans.translate('POST.status2') },
            { id: 2, text: trans.translate('POST.status3') },
            { id: 3, text: trans.translate('POST.status4') },
            { id: 4, text: trans.translate('POST.status5') }

        ];
    }


    handleInputChange(event, data) {
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }
        if (name) {
            let item = this.state.curItem;
            item[name] = (event.target.validity.valid) ? value : this.state.curItem[name];
            if (event.setResultType) {
                this.setState({ curItem: item, resultType: value });
            } else {
                this.setState({ curItem: item });
            }
        }
    }

    /**
     * set state for numeric number input
     * @param {Object} event 
     */
    handleNumberInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value

        if (name) {
            var numericExpression = /^[0-9\b]+$/;
            if (value == "" || numericExpression.test(value)) {
                let item = this.state.curItem;
                item[name] = value;
                this.setState({ curItem: item });
            }
        }
    }

    /**
     * handle Input Currency Change value
     * @author khanh.le
     * @param {*} values 
     * @param {*} props 
     */
    handleInputCurrencyChange(values, props) {
        const { formattedValue, value } = values;
        if (props.inputName) {
            let item = this.state.curItem;
            item[props.inputName] = value;
            this.setState({ curItem: item });
        }
    }
    /**
     * handle Multiple Change Value
     * @author khanh.le
     * @param {*} values 
     * @param {*} props 
     */
    handleMultipleChange(event) {
        let target = event.target;
        let name = target.name;
        var options = target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (name) {
            let item = this.state.curItem;
            item[name] = value;
            this.setState({ curItem: item });
        }

    }
    /**
     * handle Search Input Change Value
     * @author jicheng
     * @param {*} values 
     * @param {*} props 
     */
    handleSearchInputChange(event, isShowProgress = true) {
        let self = this;
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let item = this.state.searchParam;
            /* Minh.Pham: kiểm tra nếu là số và không bắt đầu = 0(SDT) thì convert lại thành số*/
            /*Fix lỗi tự động convert số thành chuỗi => khi xuống SQL bị sai*/
            if (target.type !== 'checkbox') {
                if (!isNaN(value) && !value.startsWith('0') && !Libs.isBlank(value)) {
                    value = value * 1;
                }
            }
            item[name] = value;
            this.setState({ searchParam: item }, () => {
                setTimeout(() => { self.getList(false, isShowProgress) }, 500);
            });
        }
    }


    /**
     * handle OnBlur Value
     * @author jicheng
     * @param {*} values 
     * @param {*} props 
     */
    handleOnBlur(event) {
        let self = this;
        let target = event.target;
        let name = target.name;
        let value = target.value
        // var date = parseDate(value);
        // if (!isValidDate(date)) {
        //     //create date based on momentjs (we have that)
        //     date = moment().format('DD/MM/YYYY');
        // }
        if (name) {
            let item = this.state.curItem;
            item[name] = value;
            this.setState({ curItem: item });
        }
    }
    /**
     * handle File Select Change Value
     * @author jicheng
     * @param {*} values 
     * @param {*} props 
     */
    handleFileSelectChange(e) {
        let self = this;
        var reader = new FileReader();
        try {
            let file = e.target.files[0];
            if (file) {
                reader.onload = function (event) {
                    let data = event.target.result.replace("data:" + file.type + ";base64,", '');
                    let curItem = self.state.curItem;
                    curItem.imgData = data;
                    self.setState({
                        curItem: curItem
                    })
                }
                reader.readAsDataURL(file);
            }
        } catch (err) {
            console.log(err)
        }
    }


    toast(message, type, pos = "top-right") {
        let posistion = "top-right";
        if (typeof pos != 'undefined') {
            posistion = pos;
        }
        switch (type) {
            case "info":
                toast.info(message, {
                    position: posistion,
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 10
                });
                break;
            case "error":
                toast.error(message, {
                    position: posistion,
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 10
                });
                break;
            case "warn":
                toast.warn(message, {
                    position: posistion,
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 10
                });
                break;
        }

    }


    /**
     * handle name input change
     * sử dụng cho tự động genkey từ name
     * field bắt buộc phải là name và id
     * @param {*} event
     * @memberof Position
     */
    nameInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (name) {
            let item = this.state.curItem;
            item[name] = (event.target.validity.valid) ? value : this.state.curItem[name];
            //neu form ở chế độ update thì không phát sinh
            if (this.state.currentMode == Constants.SCREEN_MODE.ADD && !this.isKeyChange) {
                item[this.defaultFieldId] = Libs.generateKeyFromName(item[name]);
                setValidateMessage({ [this.defaultFieldId]: null }, true);
            }
            this.setState({ curItem: item });
        }
    }
    /**
      * handle name input change
      * sử dụng cho tự động genkey từ name
      * field bắt buộc phải là name và id
      * @param {*} event
      * @memberof Position
      */
    keyInputChange(event) {

        let target = event.target;
        let name = target.name;
        let value = target.value
        if (name) {
            let item = this.state.curItem;
            item[name] = (event.target.validity.valid) ? value : this.state.curItem[name];

            if (Libs.isBlank(item[name])) {
                this.isKeyChange = false;
                item[name] = Libs.generateKeyFromName(item[this.defaultFieldName])
            } else {
                this.isKeyChange = true;
            }
            this.setState({ curItem: item });
        }

    }

}