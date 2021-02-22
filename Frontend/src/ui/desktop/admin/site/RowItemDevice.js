import React, { Component } from 'react';
import { RSwitch } from '../../../../component/Controls';
class RowItemDevice extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @description item change event status
     * @author long.pham 2021-01-12
     */
    onDeviceStatusChange = () => {
        if (!this.props.onDeviceStatusChange || typeof this.props.onDeviceStatusChange !== 'function') return;
        this.props.onDeviceStatusChange(this.props.index);
        return;
    }

    /**
     * @description Item click event edit
     * @author long.pham 2021-01-12
     */
    onItemClick = () => {
        if (!this.props.onItemClick || typeof this.props.onItemClick !== 'function') return;
        this.props.onItemClick(this.props.index);
    }

    /**
     * @description Item click event delete
     * @author long.pham 2021-01-12
     */
    onItemClickDelete = () => {
        if (!this.props.onItemClickDelete || typeof this.props.onItemClickDelete !== 'function') return;
        this.props.onItemClickDelete(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <div className={item.is_delete == 0 ? "body-row" : "body-row is-delete"}>
                <div className="body-col w100px"><p>{item.id}</p> </div>
                <div className="body-col w200px"><p>{item.serial_number}</p></div>
                <div className="body-col w300px"><p>{item.modbusdevicenumber}</p></div>
                <div className="body-col w200px"><p>{item.devicename}</p></div>
                <div className="body-col w200px"><p>{item.devicetype}</p></div>
                <div className="body-col w200px"><p>{item.deviceclass}</p></div>
                <div className="body-col w200px"><p>{item.configuration}</p></div>
                <div className="body-col w200px"><p>{item.configurationchangetime}</p></div>
                <div className="body-col w400px"><p>{item.configurationchecksum}</p></div>
                <div className="body-col w200px"><p>{item.datatablename}</p></div>
                <div className="body-col w100px text-center">
                    {item.is_delete * 1 == 0 ?
                        <div className="checkmark">
                            <RSwitch
                                inputId={"status_" + item.id}
                                inputName="is_status"
                                checked={(item.status * 1 == 1) ? true : false}
                                onChange={this.onDeviceStatusChange.bind(this)}
                            />
                        </div>
                        : ""}

                </div>
                <div className="body-col w100px text-right">
                    <p className="function">
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
export default RowItemDevice;
