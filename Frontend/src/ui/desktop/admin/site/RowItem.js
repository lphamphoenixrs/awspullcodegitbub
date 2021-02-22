import React, { Component } from 'react';
import { RSwitch } from '../../../../component/Controls';
import Libs from '../../../../utils/Libs';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @description Status change event
     * @author long.pham 2021-01-06
     */
    onStatusChange = () => {
        if (!this.props.onStatusChange || typeof this.props.onStatusChange !== 'function') return;
        this.props.onStatusChange(this.props.index);
        return;
    }

    /**
     * @description Item click event edit
     * @author long.pham 2021-01-06
     */
    onItemClick = () => {
        if (!this.props.onItemClick || typeof this.props.onItemClick !== 'function') return;
        this.props.onItemClick(this.props.index);
    }

    
    /**
     * @description Item click event view manage site
     * @author long.pham 2021-01-06
     */
    onItemClickManageSite = () => {
        if (!this.props.onItemClickManageSite || typeof this.props.onItemClickManageSite !== 'function') return;
        this.props.onItemClickManageSite(this.props.index);
    }
    /**
     * @description Item click event delete
     * @author long.pham 2021-01-06
     */
    onItemClickDelete = () => {
        if (!this.props.onItemClickDelete || typeof this.props.onItemClickDelete !== 'function') return;
        this.props.onItemClickDelete(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <div className={item.is_delete == 0 ? "body-row" : "body-row is-delete"}>
                <div className="body-col width10"><p>{item.id}</p> </div>
                <div className="body-col width30">
                    <p><strong>{item.name}</strong></p>
                    {!Libs.isBlank(item.address) ? <p className="address">Address:<span> {item.address}</span></p> : ""}
                </div>
                <div className="body-col width20">
                    <p>{item.customer_name}</p>
                </div>
                

                <div className="body-col width10">
                    <p>{item.dc_capacity}</p>
                </div>
                <div className="body-col width10">
                    <p>{item.built_since}</p>
                </div>
                

                <div className="body-col width10">
                    <div className="checkmark">
                        <RSwitch
                            inputId={"status_" + item.id}
                            inputName="status"
                            checked={(item.status * 1 == 1) ? true : false}
                            onChange={this.onStatusChange.bind(this)}
                        />
                    </div>
                </div>
                <div className="body-col width10 text-right">
                    <p className="function">
                    <a title="Add device" onClick={this.onItemClickManageSite.bind(this)} className="fnc edit"><span className="icon icon-plus-2"></span></a>
                        <a title="Edit" onClick={this.onItemClick.bind(this)} className="fnc edit"><span className="icon icon-pencil"></span></a>
                        <a title="Delete" onClick={this.onItemClickDelete.bind(this)} className="fnc delete">
                            {item.is_delete == 0 ? <span className="icon icon-trash-o"></span> : <span className="icon icon-reply"></span>}
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}
export default RowItem;
