import BaseComponent from '../../../BaseComponent';
import ListSitePopupJsx from './ListSitePopup.jsx';
import Libs from '../../../../utils/Libs';

class ListSite extends BaseComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            curItem: this.props.curItem,
            dataList: this.props.dataList
        };
        this.jsxTemplate = ListSitePopupJsx;
    }
    componentDidMount() {
        super.componentDidMount();
    }

    onItemClickView = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index];
        this.props.onCloseListSitePopup(item, index);
        this.setState({
            curItem: item
        });
    }
    render() {
        return this.jsxTemplate.call(this);
    }
}

export default ListSite;