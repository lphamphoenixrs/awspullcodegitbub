/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import AdminBaseComponent from '../../../AdminBaseComponent';
import FilterPopupJsx from './FilterPopup.jsx';
import ErrorLevelService from '../../../../services/ErrorLevelService';

class FilterPopup extends AdminBaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            curItem: {},
            listErrorLevel: []
        }
        this.jsxTemplate = FilterPopupJsx;
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 2021-01-06
     */
    componentDidMount() {
        this.getListErrorLevel();
    }

    /**
  * handle check element
  * @param {*} content 
  * @param {*} props 
  */
    handleElementChange = (index) => {
        let self = this;
        var data = self.state.listErrorLevel;
        var item = data[index];
        if (Libs.isObjectEmpty(item)) return;
        data[index].active = data[index].active == 1 ? 0 : 1;
    
        this.setState({
            listErrorLevel: data
        });

    }

    onClickReset() {
        var data = this.state.listErrorLevel, self = this;
        if (!Libs.isArrayData(data)) return;
        for(var i =0; i < data.length; i++){
            data[i].active = 0;
        }
        this.setState({
            listErrorLevel: data
        }, () => {
            self.props.callBackReset();
        });
    }

    async onFilterAction() {
        var listErrorLevel = this.state.listErrorLevel;
        if(!Libs.isArrayData(listErrorLevel)) return;
        var dataErrorState = listErrorLevel.filter((item) => item.active == 1);
        this.props.callBackFilter(dataErrorState);
    }
    
    /**
     * Get list error level
     * @author long.pham 2021-01-28
     * @return array
     */

    getListErrorLevel() {
        let self = this;
        ErrorLevelService.instance.getList({}, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    listErrorLevel: data
                });
            } else {
                self.setState({
                    listErrorLevel: []
                });
            }
        })
    }
}
export default FilterPopup;