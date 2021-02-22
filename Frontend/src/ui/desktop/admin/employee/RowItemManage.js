import React, { Component } from 'react';
import { RSwitch } from '../../../../component/Controls';
class RowItemManage extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @description is manage change event
     * @author long.pham 2021-01-07
     */
    onManageChange = () => {
        if (!this.props.onManageChange || typeof this.props.onManageChange !== 'function') return;
        this.props.onManageChange(this.props.index);
        return;
    }

    render() {
        var item = this.props.dataItem;
        return (
            <div className={item.is_delete == 0 ? "body-row" : "body-row is-delete"}>
                <div className="body-col width10"><p>{item.id}</p> </div>
                <div className="body-col width30">
                    <p>{item.name}</p>
                </div>
                <div className="body-col width30">
                    <p>{item.customer_name}</p>
                </div>

                <div className="body-col width20">
                    <p>{item.built_since}</p>
                </div>

                <div className="body-col width10 text-center">
                    <div className="checkmark">
                        <RSwitch
                            inputId={"is_manage_" + item.id}
                            inputName="is_manage"
                            checked={(item.is_manage * 1 == 1) ? true : false}
                            onChange={this.onManageChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default RowItemManage;
