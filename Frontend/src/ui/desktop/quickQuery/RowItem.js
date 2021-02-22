import React, { Component } from 'react';
import Libs from '../../../utils/Libs';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var item = this.props.dataItem;
        var dataListParameterActive = this.props.dataListParameterActive;
        var rowItems = null;
        if(Libs.isArrayData(dataListParameterActive)){
            rowItems = dataListParameterActive.map((v, index) => {
                return <div className="body-col width15"> <p>{item[v.slug]} {v.unit}</p> </div>
            });
        }
        
        return (
            <div className="body-row">
                <div className="body-col width15">
                    <p>{item.local_time}</p>
                </div>
                <div className="body-col width10">
                    <p>{item.devicename}</p>
                </div>
                {rowItems}
            </div>
        );
    }
}
export default RowItem;
