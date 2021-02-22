import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RText } from '../../../../component/Controls';
import { Pagging } from '../../../../component/Pagging';
import RowItemManage from './RowItemManage'
export default function () {
    var { curItem, dataList, searchParam } = this.state;
    var RowItems = null;
    if (Libs.isArrayData(dataList)) {
        RowItems = dataList.map((item, index) => {
            return <RowItemManage
                key={'row_item_' + index}
                index={index}
                dataItem={item}
                onManageChange={this.onManageChange}
            />
        });
    }

    return (
        <Modal visible={true} className="modal-employee" dialogClassName="modal-lg modal-dialog-scrollable">
            <div className="modal-header">
                <h5 className="modal-title">
                    Manage site
                </h5>
                <button type="button" onClick={this.props.onCloseAddManageSitePopup.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">
                <div className="add-user-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <div className="form-group">
                                <RText label={trans.translate('EMPLOYEE.first_name')}
                                    required="required" inputClass="form-control"
                                    inputId="fullname" inputName="fullname"
                                    value={curItem.fullname}
                                    disabled={true}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>


                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <div className="form-group">
                                <RText label={trans.translate('EMPLOYEE.phone')}
                                    inputClass="form-control"
                                    required="required"
                                    inputId="phone" inputName="phone"
                                    value={curItem.phone}
                                    disabled={true}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <div className="form-group">
                                <RText label={trans.translate('EMPLOYEE.email')}
                                    required="required"
                                    inputClass="form-control"
                                    inputId="email" inputName="email"
                                    value={curItem.email}
                                    disabled={true}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>


                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="content">
                                <div className="lists">
                                    <div className="box-header">
                                        <div className="header-row">
                                            <div onClick={e => this.onSort(e, 'id')} className={searchParam.sort_column == "id" ?
                                                "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}>ID</div>
                                            <div onClick={e => this.onSort(e, 'name')} className={searchParam.sort_column == "name" ?
                                                "header-col width30 sorting " + searchParam.order_by : "header-col width30 sorting"}>Site name</div>

                                            <div onClick={e => this.onSort(e, 'customer_name')} className={searchParam.sort_column == "customer_name" ?
                                                "header-col width30 sorting " + searchParam.order_by : "header-col width30 sorting"}>Customer name</div>
                                            <div className="header-col width20">Built since</div>
                                            <div className="header-col width10"></div>
                                        </div>
                                    </div>

                                    <div className="box-body">
                                        {RowItems ? RowItems : <div className="data-empty">Data empty</div>}
                                    </div>
                                </div>

                                <div className="box-footer">
                                    <Pagging total={this.state.paging.total} current={this.state.paging.current} onSelectPage={(index) => this.onSelectPage.bind(this, index)}></Pagging>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Modal>
    )
}