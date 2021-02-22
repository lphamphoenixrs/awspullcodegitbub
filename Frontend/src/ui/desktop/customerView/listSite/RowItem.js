import React, { Component } from 'react';

class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @description Item click event delete
     * @author long.pham 2020-12-08
     */
    onItemClickView = () => {
        if (!this.props.onItemClickView || typeof this.props.onItemClickView !== 'function') return;
        this.props.onItemClickView(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        var curItem = this.props.curItem;
        return (
            <li key={this.props.index} className="col-md-12">
                <div  onClick = {this.onItemClickView.bind(this)}  className={curItem.id == item.id ? "item active": "item"}>
                    <img src ="/assets/images/site_icon.png" alt = {item.name} />
                    <h2>{item.name}</h2>
                    <p>{item.address_full}</p>
                </div>
            </li>

        );
    }
}
export default RowItem;
