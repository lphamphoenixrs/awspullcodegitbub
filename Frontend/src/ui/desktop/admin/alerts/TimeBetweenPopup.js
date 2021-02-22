/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import AdminBaseComponent from '../../../AdminBaseComponent';
import TimeBetweenPopupJsx from './TimeBetweenPopup.jsx';

class TimeBetweenPopup extends AdminBaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            curItem: this.props.curItem,
        }
        this.jsxTemplate = TimeBetweenPopupJsx;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateInputChange = this.handleDateInputChange.bind(this);
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 2021-01-06
     */
    componentDidMount() {
        let curItem = this.state.curItem;
        if (Libs.isBlank(curItem.date_from)) {
            curItem.date_from = Libs.getCurrentMMDDYYYYHI();
        }

        if (Libs.isBlank(curItem.date_to)) {
            curItem.date_to = Libs.getCurrentMMDDYYYYHI();
        }
        curItem.max_date = Libs.getCurrentMMDDYYYYHI();
        curItem.min_date = (Libs.addYears(Libs.getCurrentMMDDYYYYHI(), -60));
        this.setState({ curItem: curItem });
    }


    handleDateInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }
        if (name) {
            let item = this.state.curItem;
            if (name == 'date_from') {
                if (Libs.compareDate(value, 'MM/DD/YYYY', item.date_to) == 1) {
                    item.date_to = value;
                }
            }

            if (name == 'date_to') {
                if (Libs.compareDate(value, 'MM/DD/YYYY', item.date_from) < 0) {
                    item.date_from = value;
                }
            }

            item[name] = value;
            this.setState({
                curItem: item
            });
        }
    }

    async onSetTimeAction() {
        var curItem = this.state.curItem;
        this.props.callBackSetTime(curItem);
    }



}
export default TimeBetweenPopup;