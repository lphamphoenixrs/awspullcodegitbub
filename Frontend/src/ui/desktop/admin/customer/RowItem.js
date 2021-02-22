import React, { Component } from 'react';
import { RSwitch } from '../../../../component/Controls';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @description Status change event
     * @author long.pham 2021-01-05
     */
    onStatusChange = () => {
        if (!this.props.onStatusChange || typeof this.props.onStatusChange !== 'function') return;
        this.props.onStatusChange(this.props.index);
        return;
    }

    /**
     * @description Item click event edit
     * @author long.pham 2021-01-05
     */
    onItemClick = () => {
        if (!this.props.onItemClick || typeof this.props.onItemClick !== 'function') return;
        this.props.onItemClick(this.props.index);
    }

    /**
     * @description Item click event delete
     * @author long.pham 2021-01-05
     */
    onItemClickDelete = () => {
        if (!this.props.onItemClickDelete || typeof this.props.onItemClickDelete !== 'function') return;
        this.props.onItemClickDelete(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <div className={item.is_delete == 0 ? "body-row": "body-row is-delete"}>
                <div  className="body-col width10"><p>{item.id}</p> </div>
                <div className="body-col width15">
                    <p>{item.first_name}</p>
                </div>
                <div className="body-col width15">
                    <p>{item.last_name}</p>
                </div>
                <div className="body-col width20">
                    <p>{item.phone}</p>
                </div>

                <div className="body-col width20">
                    <p>{item.email}</p>
                </div>

                <div className="body-col width10">
                    {item.id == 1 ?
                        <div className="checkmark">
                            <RSwitch
                                inputId={"status_" + item.id}
                                inputName="status"
                                checked={(item.status * 1 == 1) ? true : false}
                            />
                        </div>
                        :
                        <div className="checkmark">
                            <RSwitch
                                inputId={"status_" + item.id}
                                inputName="status"
                                checked={(item.status * 1 == 1) ? true : false}
                                onChange={this.onStatusChange.bind(this)}
                            />
                        </div>
                    }
                </div>
                <div className="body-col width10 text-right">
                    <p className="function">
                        <a onClick={this.onItemClick.bind(this)} className="fnc edit"><span className="icon icon-pencil"></span></a>
                        <a onClick={this.onItemClickDelete.bind(this)} className="fnc delete">
                            {item.is_delete == 0 ? <span className="icon icon-trash-o"></span> : <span className="icon icon-reply"></span>}
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}
export default RowItem;
