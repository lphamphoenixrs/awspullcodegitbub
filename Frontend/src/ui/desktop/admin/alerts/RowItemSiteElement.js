import React, { Component } from 'react';
class RowItemSiteElement extends Component {
    constructor(props) {
        super(props);
    }

    handleSiteElementChange = () => {
        if (!this.props.handleSiteElementChange || typeof this.props.handleSiteElementChange !== 'function') return;
        this.props.handleSiteElementChange(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <li>
                <label className="radio-cm-square">
                    <input type="checkbox"
                        onChange={(e) => { this.handleSiteElementChange(this); }}
                        name="site_element"
                        id={"site_element_" + item.id}
                        className="site_element"
                        checked={item.active == 1 ? true : false}
                        value={item.id} />
                    <span className="checkmark"></span> {item.name}
                </label>
            </li>
        );
    }
}
export default RowItemSiteElement;
