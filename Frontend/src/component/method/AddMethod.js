import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import { RTextArea, RText, RButton } from '../../component/Controls';
import Libs from '../../utils/Libs';
import AddMethodValidate from './AddMethodValidate';
import MethodService from '../../services/MethodService';
class AddMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curItem: {}
        }
    }
    componentDidMount() {
        var { item } = this.props;
        this.setState({
            curItem: item
        });
        if($('#method_select_id').length)
        {
            $('#method_select_id').focus();
        }
    }
    /**
     * @description Set value đến state khi input change
     * @author Luyen Nguyen 2018-10-09
     */
    onInputChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var { curItem } = this.state;
        curItem[name] = value;
        this.setState({
            curItem
        });
        this.validateOne(event);
    }
    /**
     * @description close modal
     * @author Luyen Nguyen 2018-10-09
     */
    onCloseModal = () => {
        if (this.props.onClosePopup && typeof this.props.onClosePopup === 'function') {
            this.props.onClosePopup(false, null);
        }
    }
    /**
     * @description Lưu data
     * @author Luyen Nguyen 2018-10-09
     */
    async onSave() {
        let param = this.state.curItem, self = this;
        param.screen_mode = Constants.SCREEN_MODE.ADD;
        param.created_by = this.props.user.user_name;
        var { isAdd } = this.props;
        if (!isAdd) {
            param.screen_mode = Constants.SCREEN_MODE.EDIT;
            param.updated_by = this.props.user.user_name;
        }

        let v = new AddMethodValidate();
        let errors = await v.FLValidationAll(param);
        if (errors) {
            setValidationError(errors, 'frm-method');
            return;
        }
        MethodService.instance.save(param, (status, data, msg) => {
            //console.log('data: ', status, data);
            if (status) {
                if (self.props.onClosePopup && typeof self.props.onClosePopup === 'function')
                {
                    self.props.onClosePopup(true, data);
                }
                Libs.toast(msg, "info");
            } else {
                if (!Libs.isObjectEmpty(data)) {
                    setValidateMessage(data);
                } else {
                    if (!Libs.isBlank(msg)) {
                        Libs.toast(msg, "error");
                    }
                }
            }
        }, true);
    }
    async validateOne(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (name) {
            let param = {
                [name]: value
            }
            let v = new AddMethodValidate();
            let error = await v.validateOne(param, name);
            if (error != null) {
                setValidationError(error, 'frm-method');
            }
        }
    }
    render() {
        var { isAdd } = this.props;
        return (
            <React.Fragment>
                <Modal visible={true}  >
                    <div className="modal-header">
                        <h5 className="modal-title">{(isAdd) ? trans.translate('method.add_method_title') : trans.translate('method.edit_method_title')}</h5>
                        <button type="button" onClick={this.onCloseModal.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true" style={{ marginTop: '-10px' }}>×</button>
                    </div>
                    {/* modal-body */}
                    <div className="modal-body" id="frm-method">
                        {/* row */}
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <RText
                                    label={trans.translate('method.method_id')}
                                    required="required"
                                    inputClass="form-control"
                                    inputId="method_select_id"
                                    inputName="id"
                                    required="required"
                                    disabled={(isAdd) ? false : true}
                                    value={this.state.curItem.id}
                                    onChange={this.onInputChange.bind(this)}
                                    placeholder={trans.translate('method.method_id')}
                                    maxLength={30}
                                />
                            </div>
                        </div>
                        {/* end row */}
                        {/* row */}
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <RTextArea
                                    inputClass="form-control"
                                    label={trans.translate('method.method_name')}
                                    required="required"
                                    rows={3}
                                    inputName="name"
                                    onChange={this.onInputChange.bind(this)}
                                    value={this.state.curItem.name}
                                    maxLength={300}
                                />
                            </div>
                        </div>
                        {/* end row */}
                        {/* row */}
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <RTextArea inputClass="form-control"
                                    label={trans.translate('common.desc')}
                                    rows={5}
                                    inputName="desc"
                                    onChange={this.onInputChange.bind(this)}
                                    value={this.state.curItem.desc}
                                    maxLength={300}
                                />
                            </div>
                        </div>
                        {/* end row */}
                    </div>
                    {/* end modal-body */}
                    {/* modal-footer */}
                    <div className="modal-footer">
                        <RButton
                            iClass="fa fa-edit"
                            onClick={this.onSave.bind(this)}
                            className="btn btn-main-color"
                            text={" " + trans.translate('common.label-save')}
                            title={trans.translate('common.label-save')}
                        />
                        <RButton
                            iClass="fa fa-remove"
                            onClick={this.onCloseModal.bind(this)}
                            className="btn btn-main-color"
                            text={" " + trans.translate('common.cancel')}
                            title={trans.translate('common.cancel')}
                        />
                    </div>
                    {/* end modal-footer */}
                </Modal>
            </React.Fragment>
        );
    }
}
export default AddMethod;