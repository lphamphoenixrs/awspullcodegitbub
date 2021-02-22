import React, { Component } from 'react';
import { RButton, RTextArea } from '../Controls';
import MethodService from '../../services/MethodService';
import AddMethod from './AddMethod';
import Libs from '../../utils/Libs';
class Method extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMode: Constants.SCREEN_MODE.VIEW,
            curItem: {},
            methodList: [],
            primaryKey: null,
            methodItem: {
                isOpen: false,//Mở popup thêm công thức
                isAdd: true,//true: thêm mới, false: cập nhật
                item: {}
            },
            msgMethodError: false,
            msgSelectMethodError: false
        }
        this.checkValidation = this._checkValidation.bind(this);
        //Kiểm tra trạng thái đang ở trong component hay đã thoát khỏi component
        this._isMounted = true;
    }
    /**
     * @description Được gọi ngay sau khi component được mount vào trong DOM. Được gọi sau hàm render
     * @author Luyen Nguyen 2018-11-23
     */
    componentDidMount() {
        //Lấy danh sách công thức
        this.getMethodList();
        this.setState({
            curItem: this.props.curItem,
            msgMethodError: false,
            msgSelectMethodError: false
        });
        //đăng ký sự kiện sau khi render xong
        if (this.props.registerMethod && typeof this.props.registerMethod === 'function') {
            this.props.registerMethod(this);
        }
    }
    /**
     * @description Được gọi ngay trước khi có props mới tức nextProps
     * trong hàm này không được phép setState để setState phải gọi đến hàm componentDidUpdate
     * @author Luyen Nguyen 2018-10-30
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentMode !== prevState.currentMode) {
           return { currentMode: nextProps.currentMode};
        }
        if (nextProps.primaryKey !== prevState.primaryKey) {
            return { primaryKey: nextProps.primaryKey};
         }
        else return null;
    }
    /**
     * @description Hàm này được gọi ngay sau khi component được render xong
     * Lúc này cấu trúc DOM mới được cập nhật, tiến hành set lại giá trị cho state
     * @author Luyen Nguyen 2018-10-30
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentMode != this.state.currentMode && this._isMounted) {
            this.setState({
                currentMode: prevState.currentMode
            }, ()=>{
                this.setState({
                    msgMethodError: false,
                    msgSelectMethodError: false
                });
            });
        }
        if (prevState.primaryKey != this.state.primaryKey && this._isMounted) {
            this.setState({
                primaryKey: prevState.primaryKey,
                curItem: this.props.curItem,
                msgMethodError: false,
                msgSelectMethodError: false
            });
        }
    }
    /**
     * @description Được gọi trươc khi component chuẩn bị được gỡ khỏi DOM
     * set lại giá trị _isMounted = false tránh trường hợp setState khi chưa có dữ liệu từ server trả về
     * @author Luyen Nguyen 2018-10-07
     */
    componentWillUnmount() {
        this._isMounted = false;
    }
    /**
     * @description Lấy danh sách công thức
     * @author Luyen Nguyen 2018-10-08
     */
    getMethodList() {
        var self = this;
        MethodService.instance.getList(null, (arrData) => {
            if(!self._isMounted) return;
            self.setState({ methodList: arrData });
        }, false);
    }
    /**
     * @description Set giá trị đến curItem khi input change
     * @author Luyen Nguyen 2018-09-24 16:10
     */
    onInputChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var curItem = this.state.curItem;
        curItem[name] = value;
        this.setState({
            curItem
        });
        if (this.props.getMethodData && typeof this.props.getMethodData === 'function') {
            this.props.getMethodData(curItem);
        }
        if(name == 'method')
        {
            var isMethodValid = false;
            if (Libs.isBlank(curItem.method)) {
                isMethodValid = true;
            }
            this.setState({
                msgMethodError: isMethodValid
            });
        }
    }
    /**
     * @description Lấy nội dung công thức
     * @author Luyen Nguyen
     */
    onMethodChange(event) {
        var target = event.target;
        var value = target.value;
        var { curItem } = this.state;
        if (Libs.isBlank(value)) {
            curItem.method = '';
            curItem.method_id = '';
            curItem.method_description = '';
        }
        else {
            var index = Libs.findIndex(this.state.methodList, 'id', value);
            if (index !== -1) {
                var methodE = this.state.methodList[index];
                curItem.method = methodE.name;
                curItem.method_id = value;
                curItem.method_description = methodE.desc;
            }
        }
        var isMethodValid = false, isSelectMethodValid = false;
        if (Libs.isBlank(curItem.method_id)) {
            isSelectMethodValid = true;
        }
        if (Libs.isBlank(curItem.method)) {
            isMethodValid = true;
        }
        this.setState({
            curItem,
            msgSelectMethodError: isSelectMethodValid,
            msgMethodError: isMethodValid
        });
        if (this.props.getMethodData && typeof this.props.getMethodData === 'function') {
            this.props.getMethodData(curItem);
        }
    }
    /**
     * @description Mở form popup thêm công thức
     * @param boolean status: true: add, false: edit
     * @author Luyen Nguyen 2018-10-07
     */
    onAddMethod = (status) => {
        if (this.props.currentMode == Constants.SCREEN_MODE.VIEW) {
            return;
        }
        var { methodItem } = this.state;
        methodItem.isOpen = true;
        if (status) {
            methodItem.isAdd = true;
            methodItem.item = {};
        }
        else {
            var { method_id } = this.state.curItem;
            if (!Libs.isBlank(method_id)) {
                var methodE = Libs.findIndex(this.state.methodList, 'id', method_id, true);
                if (methodE && !Libs.isBlank(methodE.id)) {
                    methodItem.item = methodE;
                }
            }
            else {
                methodItem.item = {};
            }
            methodItem.isAdd = false;
        }
        this.setState({
            methodItem
        });
    }
    /**
     * @description Kiểm tra trạng thái thoát khỏi popup method
     * @param boolean status: false: close popup, true: save data
     * @author Luyen Nguyen 2018-10-07
     */
    onCloseMethodPopup = (status, dataItem) => {
        var { methodItem } = this.state;
        if (status && dataItem) {
            var { curItem, methodList } = this.state;
            curItem.method_id = dataItem.id;
            curItem.method = dataItem.name;
            curItem.method_description = dataItem.desc;
            //Nếu trạng thái đang là thêm mới mới add đến combobox công thức
            var { isAdd } = methodItem;
            if (isAdd) {
                var item = { id: dataItem.id, name: dataItem.name, desc: dataItem.desc };
                methodList.push(item);
                this.setState({
                    methodList
                });
            }
            this.setState({
                curItem,
                msgSelectMethodError: false,
                msgMethodError: false
            });
            if (this.props.getMethodData && typeof this.props.getMethodData === 'function') {
                this.props.getMethodData(curItem);
            }
        }
        else
        {
            //Nếu không lưu thì set lại giá trị cũ
            var { curItem } = this.state;
            var {item} = methodItem;
            item.id = curItem.method_id;
            item.name = curItem.method;
            item.desc = curItem.method_description;
        }
        methodItem.isOpen = false;
        this.setState({
            methodItem
        });
    }
    /**
     * @description Kiểm tra validation trước khi thêm hoặc cập nhật
     * @author Luyen Nguyen 2018-09-24 16:00
     */
    _checkValidation()
    {
        return this.checkDetailValidation();
    }
    /**
     * @description Kiểm tra validation cho công thức
     * @author Luyen Nguyen 2018-10-09
     */
    checkDetailValidation(){
        var {curItem} = this.state;
        var {method_id, method} = curItem;
        var isError = false;
        if(Libs.isBlank(method_id))
        {
            this.setState({
                msgSelectMethodError: true
            });
            isError = true;
        }
        else
        {
            this.setState({
                msgSelectMethodError: false
            });
        }
        if(Libs.isBlank(method))
        {
            this.setState({
                msgMethodError: true
            });
            isError = true;
        }
        else
        {
            this.setState({
                msgMethodError: false
            });
        }
        return isError;
    }
    render() {
        var { methodList } = this.state;
        //Load option công thức
        var methodOptions = null;
        if (methodList && methodList.length > 0) {
            methodOptions = methodList.map((item, index) => {
                return <option
                    key={'method_'+index}
                    value={item.id}
                    index={index}
                >{item.id}</option>
            });
        }
        var openMethod = this.state.methodItem.isOpen
        ? <AddMethod
            onClosePopup={this.onCloseMethodPopup}
            isAdd={this.state.methodItem.isAdd}
            item={this.state.methodItem.item}
            user={this.props.user}
        /> : '';
        var hiddenBtnEditMethod = (!Libs.isBlank(this.state.curItem.method_id)) ? true : false;
        var method_id = (Libs.isBlank(this.state.curItem.method_id)) ? "" : this.state.curItem.method_id;
        return (
            <React.Fragment>
                {openMethod}
                <div className="row">
                    {/* col */}
                    <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-2">
                        <div className="form-group">
                            <label className="control-label">{trans.translate('common.formula_name')}<span className="required">*</span></label>
                            <select onChange={this.onMethodChange.bind(this)} value={method_id} className="form-control" name="method_id">
                                <option value="">&nbsp;</option>
                                {methodOptions}
                            </select>
                            <div>
                                <RButton onClick={(e) => { this.onAddMethod(true) }} className="btn btn-main-color btn-add"
                                    iClass="fa fa-plus"
                                    title={trans.translate('common.label-add')} />
                                {hiddenBtnEditMethod &&
                                    <RButton
                                        onClick={(e) => { this.onAddMethod(false) }}
                                        className="btn btn-main-color m-l-10"
                                        iClass="fa fa-edit"
                                        title={trans.translate('common.label-delete')}
                                    />
                                }
                            </div>
                            {this.state.msgSelectMethodError &&
                                <p className="error">{trans.translate('method.select_method_required')}</p>
                            }
                        </div>
                    </div>
                    {/* end col */}
                    {/* col */}
                    <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-10">
                        <RTextArea inputClass="form-control"
                            label={null}
                            rows={6}
                            inputName="method"
                            onChange={this.onInputChange}
                            value={this.state.curItem.method}
                            maxLength={300}
                        />
                        {this.state.msgMethodError &&
                            <p className="error">{trans.translate('method.method_required')}</p>
                        }
                    </div>
                    {/* end col */}
                </div>
                {/* end row */}
                {/* row */}
                <div className="row">
                    {/* col */}
                    <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-2">
                        &nbsp;
                    </div>
                    {/* end col */}
                    {/* col */}
                    <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-10">
                        <RTextArea inputClass="form-control"
                            label={trans.translate('method.method_desc')}
                            rows={4}
                            inputName="method_description"
                            onChange={this.onInputChange}
                            value={this.state.curItem.method_description}
                            maxLength={300}
                            auth={this.props.auth}
                            onTranslateClick={this.props.onTranslateClick}
                            disabledTranslateBtn={(this.props.currentMode == Constants.SCREEN_MODE.VIEW || this.props.currentMode == Constants.SCREEN_MODE.ADD) ? true : false}
                        />
                    </div>
                    {/* end col */}
                </div>
                {/* end row */}
            </React.Fragment>
        )
    }
}
export default Method;