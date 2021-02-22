import React, { Component } from 'react';
class RowItemElement extends Component {
    constructor(props) {
        super(props);
    }

    handleElementChange = () => {
        if (!this.props.handleElementChange || typeof this.props.handleElementChange !== 'function') return;
        this.props.handleElementChange(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <li>
                <label className="radio-cm-square">
                    <input type="checkbox"
                        onChange={(e) => { this.handleElementChange(this); }}
                        name="element"
                        id={"element_" + item.id}
                        className="element"
                        checked={item.active == 1 ? true : false}
                        value={item.id} />
                    <span className="checkmark"></span> {item.name}
                </label>
            </li>
        );
    }
}
export default RowItemElement;
