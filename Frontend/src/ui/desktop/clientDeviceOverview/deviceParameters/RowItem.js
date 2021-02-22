import React, { Component } from 'react';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var item = this.props.dataItem;
        return (
            <div className="body-row">
                  <div className="body-col width60"><p>{item.parameters}</p></div>
                  <div className="body-col width20"><p>{item.value}</p></div>
                  <div className="body-col width20"><p>{item.last_change}</p></div>
                </div>

        );
    }
}
export default RowItem;
