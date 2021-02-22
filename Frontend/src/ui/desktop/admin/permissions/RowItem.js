import React, { Component } from 'react';
import { RCheckbox } from '../../../../component/Controls';
import RowItemLevel2 from './RowItemLevel2';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }
    /**
     * @description click item level 1
     * @author long.pham 27-07-2019
     */
    onClickItemLevel1 = () => {
        if (!this.props.onClickItemLevel1 || typeof this.props.onClickItemLevel1 !== 'function') return;
        this.props.onClickItemLevel1(this.props.index, this.props.id);
    }

    /**
     * @description click item level 2
     * @author long.pham 27-07-2019
     */
    onClickItemLevel2 = (index, id) => {
        if (!this.props.onClickItemLevel2 || typeof this.props.onClickItemLevel2 !== 'function') return;
        this.props.onClickItemLevel2(index, id, this.props.index);
    }





    render() {
        var item = this.props.dataItem;
        var level2 = null;
        if (Libs.isArrayData(item.dataLevel2)) {
            level2 = item.dataLevel2.map((itemLevel2, index) => {
                return <RowItemLevel2
                    key={'room_item_' + index}
                    index={index}
                    id={itemLevel2.id_screen}
                    dataItem={itemLevel2}
                    parent = {item.id}
                    rootIndex = {this.props.rootIndex}
                    rootIndexLevel1 = {index}
                    onClickItemLevel2={this.rootIndexLevel1}
                    handleInputChange = {this.props.handleInputChange}
                    _selectFullCheckedChange = {this.props._selectFullCheckedChange}
                />
            });
        }

        return (
            <div className="main-level" key={this.props.index}>
                <div className="body-row">
                    <div className="body-col first-screen">
                        <p>
                            {item.has_child ?
                                <span onClick={this.onClickItemLevel1.bind(this)}>
                                    <i className={item.collapse == 1 ? 'icon icon-minus-circle' : 'icon icon-plus-circle'} aria-hidden="true"></i>{item.screen_name} 
                                </span>
                                :
                                <span>
                                    <i className='icon icon-minus-circle' aria-hidden="true"></i>{item.screen_name} 
                                </span>
                            }

                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"full_" + this.props.id}
                                inputName="full"
                                labelClass="no-label"
                                checked={(item.auths == Constants.AUTH_MODE.FULL) || (Constants.AUTH_MODE.FULL - item.auths == 256)}
                                onChange={(e) => { this.props._selectFullCheckedChange(e, item, this.props.index) }}
                                disabled = {(item.has_child == 1 && (Libs.isBlank(item.dataLevel2))) ? true: false}
                                />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"new_" + this.props.id}
                                inputName="new"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.NEW)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.NEW, Constants.AUTH_MODE.NEW, this.props.index); }} 
                                disabled = {(item.has_child == 1 && (Libs.isBlank(item.dataLevel2))) ? true: false}
                                />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"edit_" + this.props.id}
                                inputName="edit"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.EDIT)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.EDIT, Constants.AUTH_MODE.EDIT, this.props.index); }} 
                                disabled = {(item.has_child == 1 && (Libs.isBlank(item.dataLevel2))) ? true: false}
                                />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"delete_" + this.props.id}
                                inputName="delete"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.DEL)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.DEL, Constants.AUTH_MODE.DEL, this.props.index); }} 
                                disabled = {(item.has_child == 1 && (Libs.isBlank(item.dataLevel2))) ? true: false}
                                />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"view_" + this.props.id}
                                inputName="view"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.VIEW)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.VIEW, Constants.AUTH_MODE.VIEW, this.props.index); }} 
                                disabled = {(item.has_child == 1 && (Libs.isBlank(item.dataLevel2))) ? true: false}
                                />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"print_" + this.props.id}
                                inputName="print"
                                labelClass="no-label"
                                checked={item.print}
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.PRINT)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.PRINT, Constants.AUTH_MODE.PRINT, this.props.index); }} 
                                disabled = {(item.has_child == 1 && (Libs.isBlank(item.dataLevel2))) ? true: false}
                                />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"approval_" + this.props.id}
                                inputName="approval"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.APPROVAL)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.APPROVAL, Constants.AUTH_MODE.APPROVAL, this.props.index); }} 
                                disabled = {(item.has_child == 1 && (Libs.isBlank(item.dataLevel2))) ? true: false}
                                />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"pdf_" + this.props.id}
                                inputName="pdf"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.PDF)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.PDF, Constants.AUTH_MODE.PDF, this.props.index); }} 
                                disabled = {(item.has_child == 1 && (Libs.isBlank(item.dataLevel2))) ? true: false}
                                />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"excel_" + this.props.id}
                                inputName="excel"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.EXCEL)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.EXCEL, Constants.AUTH_MODE.EXCEL, this.props.index); }} 
                                disabled = {(item.has_child == 1 && (Libs.isBlank(item.dataLevel2))) ? true: false}
                                />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"translate_" + this.props.id}
                                inputName="translate"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.TRANSLATE)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.TRANSLATE, Constants.AUTH_MODE.TRANSLATE, this.props.index); }} 
                                disabled = {(item.has_child == 1 && (Libs.isBlank(item.dataLevel2))) ? true: false}
                                />
                        </p>
                    </div>
                </div>
                {level2}
            </div>
        );
    }
}
export default RowItem;
