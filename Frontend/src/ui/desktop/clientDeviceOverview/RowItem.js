import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    onOpenDeviceProperties = () => {
        if (!this.props.onOpenDeviceProperties || typeof this.props.onOpenDeviceProperties !== 'function') return;
        this.props.onOpenDeviceProperties(this.props.index);
    }

    onOpenDeviceParameters = () => {
        if (!this.props.onOpenDeviceParameters || typeof this.props.onOpenDeviceParameters !== 'function') return;
        this.props.onOpenDeviceParameters(this.props.index);
    }

    

    render() {
        var item = this.props.dataItem;
        return (
            <div className="body-row" key={this.props.index}>
                <div className="body-col width5">
                    {item.image ? <p><img src={item.image} /></p> : ""}

                </div>

                <div className="body-col width15">
                    <p>{item.name}</p>
                </div>
                <div className="body-col width15">
                    <p>{item.serial_number}</p>
                </div>

                <div className="body-col width15">
                    <p>{item.product_group}</p>
                </div>
                <div className="body-col width10">
                    <p className="text-center"><span className={item.data_collection == 1 ? "round on" : "round off"}></span></p>
                </div>
                <div className="body-col width10">
                    <p className="text-center"><span className={item.monitoring == 1 ? "round on" : "round off"}></span></p>
                </div>
                <div className="body-col width10">
                    <p className="text-center"><a onClick = {this.onOpenDeviceProperties.bind(this)}><var className="icon icon-th"></var></a></p>
                </div>
                <div className="body-col width10">
                    <p className="text-center"><a onClick = {this.onOpenDeviceParameters.bind(this)}><var className="icon icon-tools"></var></a></p>
                </div>
                <div className="body-col width10">
                    <p className="text-center">
                    <NavLink to = {{ pathname: "/client/logs/"+ item.id_client, search: "?id_device="+ item.id}}><var className="icon icon-book"></var></NavLink>
                    </p>
                </div>

            </div>
        );
    }
}
export default RowItem;
