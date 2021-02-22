import React, { Component } from 'react';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <div className="body-row">
                <div className="body-col width5 text-center">
                    <p className="alert-count">
                        {!Libs.isBlank(item.icon_alert) ?
                            <img src={"/assets/images/" + item.icon_alert} title = {item.level} style={{ width: "20px" }} />
                            : ""}
                    </p>
                </div>
                <div className="body-col width20">
                    <p><strong>{item.site_name}</strong></p>
                </div>
                <div className="body-col width10 text-center">
                    <p>{item.priority_name}</p>
                </div>

                <div className="body-col width20">
                    <p>{item.message}</p>
                </div>
                <div className="body-col width15">
                    <p>{item.devicename}</p>
                </div>
                <div className="body-col width15 text-center">
                    <p>
                        {item.start_date}
                    </p>
                </div>

                <div className="body-col width15fix">
                    <p>{item.duration}</p>
                </div>

            </div>
        );
    }
}
export default RowItem;
