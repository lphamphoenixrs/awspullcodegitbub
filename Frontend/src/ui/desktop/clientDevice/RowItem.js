import React, { Component } from 'react';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    handleDeviceChange = () => {
        if (!this.props.handleDeviceChange || typeof this.props.handleDeviceChange !== 'function') return;
        this.props.handleDeviceChange(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <li>
                <label className="radio-cm-square">
                    <input type="radio"
                        onChange={(e) => { this.handleDeviceChange(this); }}
                        name="device"
                        id={"device_" + item.id}
                        className="device"
                        checked={item.active == 1 ? true : false}
                        value={item.id} />
                    <span className="checkmark"></span> {item.devicename}
                </label>
            </li>
        );
    }
}
export default RowItem;
