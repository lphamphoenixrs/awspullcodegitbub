import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Constants from '../utils/Constants';
import Libs from '../utils/Libs';
class FLSelect extends React.Component {
    //Khởi tạo constructor để nhận các giá trị props từ component
    constructor(props) {
        super(props);
        this.state = {
            params: null,//sử dụng post ajax
            selectedValue: null,
            options: [],
            valueChanged: false,
            optionsChanged: false
        }
        //Dùng để kiểm tra nếu có giá trị option thay đổi mới add data vào select2
        //this.selectData = null;
        this.selector = null;
        this.forceUpdateValue = false;
        this.initialRender = true;
    }
    /**
     * @description Được gọi ngay sau khi component được mount vào trong DOM. Được gọi sau hàm render
     * @author Luyen Nguyen 2018-10-07
     */
    componentDidMount() {
        this.initSelect2();
        this.updateValue();
    }
    /**
     * @description Được gọi ngay trước khi có props mới tức nextProps
     * trong hàm này không được phép setState để setState phải gọi đến hàm componentDidUpdate
     * @author Luyen Nguyen 2018-11-09
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        let nextState = null;
        if (JSON.stringify(nextProps.selectedValue) !== JSON.stringify(prevState.selectedValue)) {
            nextState = { selectedValue: nextProps.selectedValue, valueChanged: true };
        }
        if (JSON.stringify(nextProps.options) !== JSON.stringify(prevState.options)) {
            nextState = { ...nextState, options: nextProps.options, optionsChanged: true };
        }

        return nextState;
    }
    /**
     * @description Hàm này được gọi ngay sau khi component được render xong
     * Lúc này cấu trúc DOM mới được cập nhật, tiến hành set lại giá trị cho state
     * @author Luyen Nguyen 2018-11-09
     */
    componentDidUpdate(prevProps, prevState) {
        //update lại options
        if (this.state.optionsChanged) {
            // if(!this.props.isAjax)
            // {
                this.selector.empty();
                this.selector.select2(this.select2Config());
            //}
            this.state.valueChanged = true;
        }
        //update lại value
        if (this.state.valueChanged) {
            this.updateValue();
        }
        this.state.valueChanged = false;
        this.state.optionsChanged = false;
    }
    /** 
     * @description Remove select2 sau khi thoát khỏi component
     * @author Luyen Nguyen 2018-10-07
     */
    componentWillUnmount() {
        this.destroySelect2();
    }

    initSelect2() {
        this.selector.select2(this.select2Config());
        this.attachEventHandlers();
    }
    destroySelect2() {
        this.detachEventHandlers();
        this.selector.select2('destroy');
    }

    attachEventHandlers(props) {
        //bắt sự kiển select2 change
        this.selector.on('change', this.onSelect2Change);
        //bắt sự kiển select2 select
        this.selector.on("select2:select", this.onSelect2Select);
        //bắt sự kiển select2 unselect
        this.selector.on('select2:unselect', this.onSelect2Unselect);
        //bắt sự kiển select2 đóng dropdowlist
        this.selector.on('select2:close', this.onSelect2Close);
    }

    detachEventHandlers() {
        //off kiển select2 change
        this.selector.off('change');
        //off kiển select2 select
        this.selector.off("select2:select");
        //off kiển select2 unselect
        this.selector.off('select2:unselect');
        //off kiển select2 đóng dropdowlist
        this.selector.off('select2:close');
    }
    updateSelect2Value(value) {
        //off sự kiện change trước sau đó đăng ký lại
        if (!this.state.options || this.state.options.length <= 0) {
            return;
        } else {
            this.selector.val(value).trigger('change');
        }
    }
    updateValue() {
        this.updateSelect2Value(this.state.selectedValue);
        this.forceUpdateValue = false;
    }
    /**
     * @description Lấy giá trị selected sử dụng cho trường hợp sử dụng select 2 jquery
     * @author Luyen Nguyen 2018-10-07
     */
    onSelect2Change = (event) => {
       
        let self = this;
        setTimeout(function () {
            //Kiểm tra tồn tại props onChange hay không
            if (self.props.onChange && typeof self.props.onChange === 'function') {
                // var target = event.target;
                // //lấy giá trị name của select
                // var name = target.name;
                // //lấy value khi change
                // var value = target.value;
                //Đẩy sử liệu ra ngoài component
                //self.props.onChange(name, value, event);
                var data = self.selector.select2('data');
                self.props.onChange(event, data);
            }
            // //Kiểm tra tồn tại props onSelectChange hay không
            // if (self.props.onSelectChange && typeof self.props.onSelectChange === 'function') {
            //     //Đẩy dử liệu ra ngoài component
            //     //var data = $(event.target).select2('data');
            //     var data = self.selector.select2('data');
            //     self.props.onSelectChange(event, data);
            // }
        })
    }
    /**
     * @description Lấy giá trị unselect
     * @author Luyen Nguyen 2018-10-07
     */
    onSelect2Unselect = (event) => {
        let self = this;
        setTimeout(function () {
            //Kiểm tra tồn tại props onUnselect hay không
            // if (!self.props.onUnselect || typeof self.props.onUnselect !== 'function') return;
            // //Đẩy sử liệu ra ngoài component
            // var data = self.selector.select2('data');
            // self.props.onUnselect(event, data);
            
            /*Minh note: Chạy làm onselect OR onChange khi unselect*/
            if (self.props.onSelect && typeof self.props.onSelect == 'function'){
                //var data = event.params.data;
                var data = self.selector.select2('data');
                //event.target.value = null;
                //Đẩy sử liệu ra ngoài component
                self.props.onSelect(event, data);
                return;
            }
            if (self.props.onChange && typeof self.props.onChange == 'function'){
                //var data = event.params.data;
                var data = self.selector.select2('data');
                //event.target.value = null;
                //Đẩy sử liệu ra ngoài component
                self.props.onChange(event, data);
                return;
            }
        });
    }
    /**
     * @description Lấy object selected
     * @author Luyen Nguyen 2018-10-07
     */
    onSelect2Select = (event) => {
        let self = this;
        setTimeout(function () {
            if (!self.props.onSelect || typeof self.props.onSelect !== 'function') return;
            //var data = event.params.data;
            var data = self.selector.select2('data');
            //Đẩy sử liệu ra ngoài component
            self.props.onSelect(event, data);
        });
    }
    /**
    * @description Lấy object selected
    * @author Luyen Nguyen 2018-10-07
    */
    onSelect2Close = (event) => {
        event.target.focus();
        if (this.props.onSelectClose && typeof this.props.onSelectClose === 'function') {
            this.props.onSelectClose(event);
        }
    }
    /**
    * @description Cấu hình các param cho select2
    * @author Luyen Nguyen 2018-10-07
    */
    select2Config() {
        const {
            isAjax,
            allowClear,
            allowSearch,
            allowCheckbox,
            hiddenSelection,
            placeholderId,
            placeholderText,
            options
        } = this.props;
        return {
            placeholder: {
                id: (placeholderId) ? placeholderId : "",
                text: (!placeholderText) ? trans.translate('common.all') : placeholderText
            },
            data: options,
            dropdownCssClass: (allowCheckbox) ? 'select2-dropdown-checkbox' : '',
            containerCssClass: (hiddenSelection) ? 'fls-hidden-selection' : '',
            closeOnSelect: (allowCheckbox) ? false : true,
            allowClear: (!allowClear) ? false : true,
            minimumResultsForSearch: (allowSearch) ? null : Infinity,
            ajax: (isAjax) ? this.ajaxConfig() : null,
        }
    }
    /**
    * @description Cấu hình các param khi sử dụng ajax
    * @author Luyen Nguyen 2018-10-07
    */
    ajaxConfig() {
        var {
            url
        } = this.props;
        var self = this;
        var http = new flHttp(false);
        var setHeader = http.setHeader(Constants.METHOD.POST, Constants.CONTENT_TYPE.json);
        // const API_LINK = process.api_host || Constants.API_HOST;
        const protocol = location.protocol;
        const API_HOST = process.api_host || Constants.API_HOST;
        const API_HTTP_PORT = process.api_http_port || Constants.API_HTTP_PORT;
        const API_HTTPS_PORT = process.api_https_port || Constants.API_HTTPS_PORT;
        if (protocol == 'https:') {
            url = protocol + "//" + API_HOST + ":" + API_HTTPS_PORT + "/";
        } else {
            url = protocol + "//" + API_HOST + ":" + API_HTTP_PORT + "/";
        }
        return {
            url: function () {
                return url + self.props.url;
            },
            headers: setHeader.headers,
            dataType: 'json',
            data: function (prs) {
                var def = {
                    name: '',
                    headquarter_id: setHeader.headers.headquarter,
                    lang: setHeader.headers.lang,

                };
                var newParams = $.extend(def, (self.props.params) ? self.props.params : {});
                newParams.name = $.trim(prs.term);
                return newParams;
            },
            processResults: function (req) {
                if (req.status) {
                    let dataList = req.data;
                    if (self.props.defaultOptionName && dataList && dataList.length > 0) {
                        var defaultOption = [{
                            id: (self.props.defaultOptionId) ? self.props.defaultOptionId : "-1",
                            text: self.props.defaultOptionName
                        }];
                        dataList = defaultOption.concat(dataList);
                    }
                    return { results: dataList };
                }
                else {
                    return { results: [] };
                }
            },
            cache: false
        }
    }
    render() {
        let {
            children,
            className,
            tag: Tag,
            label,
            selectedValue,
            placeholderId,
            placeholderText,
            defaultOptionId,
            defaultOptionName,
            allowClear,
            allowSearch,
            allowCheckbox,
            hiddenSelection,
            isAjax,
            url,
            params,
            onChange,
            onSelectChange,
            onSelect,
            onUnselect,
            onSelectClose,
            ...attributes
        } = this.props;
        //set class name to tag
        const classes = classNames(
            'form-control',
            className
        );
        return (
            <React.Fragment>
                {(this.props.label != "" && typeof this.props.label != 'undefined') ?
                    <label className="control-label">{trans.translate(this.props.label)}
                        {this.props.required == 'required' ? <span className="required">*</span> : null}
                    </label> : null}
                <Tag {...attributes} ref={(ele) => this.selector = $(ele)} disabled={this.props.disabled} className={classes}>
                </Tag>
            </React.Fragment>
        );
    }
}
FLSelect.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.string,
    allowClear: PropTypes.bool,
    allowSearch: PropTypes.bool,
    allowCheckbox: PropTypes.bool,
    hiddenSelection: PropTypes.bool,
    placeholderText: PropTypes.string,
    defaultOptionName: PropTypes.string,
    onChange: PropTypes.func,
    onSelectChange: PropTypes.func,
    onSelect: PropTypes.func,
    onUnselect: PropTypes.func,
    onSelectClose: PropTypes.func,
    isAjax: PropTypes.bool,
    url: PropTypes.string
};
FLSelect.defaultProps = {
    tag: 'select'
};
export default FLSelect;