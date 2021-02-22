import React, { Component } from 'react';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <div className="body-row">
                <div className="body-col width10">
                    <p>{item.id}</p>
                </div>

                <div className="body-col width10">
                    <p className="text-center">{item.start}</p>
                </div>
                <div className="body-col width10">
                    <p>{item.status == 1 ? <span className="open">Open</span>: <span className="closed">Closed</span>}</p>
                </div>
                <div className="body-col width10">
                    <p>{item.duration}</p>
                </div>

                <div className="body-col width30">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <p className="site_name"><img src="/assets/images/site_icon.png" />{item.site_name}</p>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <p className="device_name"><img src="/assets/images/device_default.png" />{item.devicename}</p>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="message_group">
                                <div className="type">
                                    {item.type_error_name}
                                </div>
                                <div className="message">
                                    {item.message}
                                </div>

                                <div className="group_hover">
                                    <p className="type_hover">{item.type_error_name}</p>
                                    <p className="msg">{item.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="body-col width10">
                    <p>{item.asset}</p>
                </div>
                <div className="body-col width10">
                    <p><strong>{item.capacity}</strong> <span className="unit">{item.capacity_unit}</span></p>
                </div>
                <div className="body-col width10">
                    <p>{item.level}</p>
                </div>
            </div>
        );
    }
}
export default RowItem;
