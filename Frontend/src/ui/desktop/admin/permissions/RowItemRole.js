import React, { Component } from 'react';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @description Item click event
     * @author long.pham 27-07-2019
     */
    onItemClick = () => {
        if (!this.props.onItemClick || typeof this.props.onItemClick !== 'function') return;
        this.props.onItemClick(this.props.index);
    }


    render() {
        var item = this.props.dataItem;
        var curItem = this.props.curItem;
        return (
            <div key = {this.props.index} onClick={this.onItemClick.bind(this)} className={curItem.id == item.id ? "body-row active" : "body-row"} key={item.id}>
                <div className="body-col width20 text-left">
                    <p>{this.props.index + 1}</p>
                </div>
                <div className="body-col width80"><p className="text-left">{item.name}</p></div>
            </div>
        );
    }
}
export default RowItem;
