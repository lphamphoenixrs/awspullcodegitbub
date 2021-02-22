import React, { Component } from 'react';
class GalleryItem extends Component {
    constructor(props) {
        super(props);
    }

    /**
    * @description Item click event delete
    * @author long.pham 09/25/2020
    */
    onGalleryItemClickDelete = () => {
        if (!this.props.onGalleryItemClickDelete || typeof this.props.onGalleryItemClickDelete !== 'function') return;
        this.props.onGalleryItemClickDelete(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <li key={this.props.index} className="col-md-4">
                <div className={item.is_default == 1 ? "item active" : "item"}>
                    <div className="img">
                        <img src={item.file_upload}  onClick={(e) => { this.props.handleDefaultInputChange(e, this.props.index); }} />
                    </div>
                    <div onClick={this.props.deleteGalleryItem.bind(this, this.props.index)} className="delete"><span className="icon icon-trash-o"></span></div>
                </div>
            </li>
        );
    }
}
export default GalleryItem;
