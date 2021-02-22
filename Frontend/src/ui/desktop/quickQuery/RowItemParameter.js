import React, { Component } from 'react';
class RowItemParameter extends Component {
    constructor(props) {
        super(props);
    }

    handleParameterChange = () => {
        if (!this.props.handleParameterChange || typeof this.props.handleParameterChange !== 'function') return;
        this.props.handleParameterChange(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <li>
                <label className="radio-cm-square">
                    <input type="checkbox"
                        onChange={(e) => { this.handleParameterChange(this); }}
                        name="parameter"
                        id={"parameter_" + item.id}
                        className="parameter"
                        checked={item.active == 1 ? true : false}
                        value={item.id} />
                    <span className="checkmark"></span> {item.name}
                </label>
            </li>
        );
    }
}
export default RowItemParameter;
