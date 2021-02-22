import React from 'react';
import RowItem from './RowItem';
import RowItemRole from './RowItemRole';
import { Pagging } from '../../../../component/Pagging';



export default function () {
    var { curItem, dataListScreen, dataListRole } = this.state;
    var rowItems = null;
    if (Libs.isArrayData(dataListScreen)) {
        rowItems = dataListScreen.map((item, index) => {
            return <RowItem
                key={'row_item_' + index}
                index={index}
                id={item.id_screen}
                dataItem={item}
                rootIndex={index}
                rootIndexLevel1=''
                onClickItemLevel1={this.onClickItemLevel1}
                onClickItemLevel2={this.onClickItemLevel2}
                handleInputChange={this.handleInputChange}
                _selectFullCheckedChange={this._selectFullCheckedChange}
            />
        });
    }

    var rowItemsRole = null;
    if (Libs.isArrayData(dataListRole)) {
        rowItemsRole = dataListRole.map((item, index) => {
            return <RowItemRole
                key={'row_item_' + index}
                index={index}
                dataItem={item}
                curItem={curItem}
                onItemClick={this.onItemClick}
            />
        });
    }



    return (

        <div className="permissions" >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-md-6 col-sx-12">
                        <h1 className="title">
                            {trans.translate('PERMISSIONS.title')}
                        </h1>
                    </div>

                    <div className="col-lg-12 col-sm-12 col-md-12 col-sx-12">
                        <div className="content">
                            <div className="row">
                                <div className="col-lg-4 col-sm-4 col-md-4 col-sx-4">
                                    <div className="body">
                                        <div className="lists list-fps">
                                            <h2 className="title">{trans.translate('PERMISSIONS.label_list_roles')} </h2>
                                            <div className="roles">
                                                <div className="box-header">
                                                    <div className="header-row">
                                                        <div className="header-col width20 text-left">
                                                            {trans.translate('ROLE.id')}
                                                        </div>
                                                        <div className="header-col width80 text-left">
                                                            {trans.translate('ROLE.name')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="box-body">
                                                    {rowItemsRole ? rowItemsRole : <div className="data-empty">{trans.translate('common.data_empty')}</div>}
                                                </div>

                                            </div>


                                        </div>
                                    </div>
                                    <div className="footer">
                                        <Pagging
                                            total={this.pagging.total}
                                            current={this.pagging.current}
                                            inputChangedHandler={this.inputChangedHandler}
                                            onRolesKeyPress={this.onRolesKeyPress}
                                            onInputPage={this.onInputPage}
                                            onSelectPage={(index) => this.onSelectPage.bind(this, index)}>
                                        </Pagging>
                                    </div>
                                </div>

                                <div className="col-lg-8 col-sm-8 col-md-8 col-sx-8">
                                    <div className="body">
                                        <div className="lists list-fps">
                                            <h2 className="title">{trans.translate('PERMISSIONS.label_list_permissions')}: {curItem.name} <a onClick = {this.updatePermission.bind(this)} className="update-permission">Update permission</a> </h2>
                                            <div className="list-permissions">
                                                <div className="main-permission">
                                                    <div className="permission-table">
                                                        <div className="box-header">
                                                            <div className="header-row">
                                                                <div className="header-col first-screen"> {trans.translate('PERMISSIONS.screen_name')}</div>
                                                                <div className="header-col widthfix80">{trans.translate('PERMISSIONS.full')}</div>
                                                                <div className="header-col widthfix80"> {trans.translate('PERMISSIONS.add')}</div>
                                                                <div className="header-col widthfix80"> {trans.translate('PERMISSIONS.edit')}</div>
                                                                <div className="header-col widthfix80">{trans.translate('PERMISSIONS.delete')}</div>
                                                                <div className="header-col widthfix80">{trans.translate('PERMISSIONS.view')}</div>
                                                                <div className="header-col widthfix80">{trans.translate('PERMISSIONS.print')}</div>
                                                                <div className="header-col widthfix80">{trans.translate('PERMISSIONS.approval')}</div>
                                                                <div className="header-col widthfix80">{trans.translate('PERMISSIONS.pdf')}</div>
                                                                <div className="header-col widthfix80">{trans.translate('PERMISSIONS.excel')}</div>
                                                                <div className="header-col widthfix80">{trans.translate('PERMISSIONS.translate')}</div>
                                                            </div>
                                                        </div>


                                                        <div className="box-body">
                                                            {rowItems ? rowItems : <div className="data-empty">{trans.translate('common.data_empty')}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}