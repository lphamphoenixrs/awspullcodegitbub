/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import AdminBaseComponent from '../../../AdminBaseComponent';
import FilterPopupJsx from './FilterPopup.jsx';
import ErrorLevelService from '../../../../services/ErrorLevelService';
import AlertService from '../../../../services/AlertService';
import Libs from '../../../../utils/Libs';

class FilterPopup extends AdminBaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            curItem: {
                column: 1
            },
            listErrorLevel: [],
            listSite: [],
            listFilter: [{ id: 1, text: "Alert Severity" }, { id: 2, text: "Site name" }]
        }
        this.jsxTemplate = FilterPopupJsx;
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 2021-01-06
     */
    componentDidMount() {
        this.getListErrorLevel();
        this.getListSite();
    }

    handleInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        var self = this;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }
        if (name) {
            let item = this.state.curItem;
            item[name] = value;
            this.setState({
                curItem: item
            }, () => {
                var data = self.state.listErrorLevel, listSite = self.state.listSite;
                if (Libs.isArrayData(data)) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].active = 0;
                    }
                }
        
                if (Libs.isArrayData(listSite)) {
                    for (var j = 0; j < listSite.length; j++) {
                        listSite[j].active = 0;
                    }
                }
                self.setState({
                    listErrorLevel: data,
                    listSite: listSite
                });
                $('.scrollbar-inner').scrollbar();
            });
        }
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


    handleSiteElementChange = (index) => {
        let self = this;
        var data = self.state.listSite;
        var item = data[index];
        if (Libs.isObjectEmpty(item)) return;
        data[index].active = data[index].active == 1 ? 0 : 1;

        this.setState({
            listSite: data
        });

    }

    onClickReset() {
        var data = this.state.listErrorLevel, self = this, listSite = this.state.listSite;

        if (Libs.isArrayData(data)) {
            for (var i = 0; i < data.length; i++) {
                data[i].active = 0;
            }
        }

        if (Libs.isArrayData(listSite)) {
            for (var j = 0; j < listSite.length; j++) {
                listSite[j].active = 0;
            }
        }

        this.setState({
            listErrorLevel: data,
            listSite: listSite
        }, () => {
            self.props.callBackReset();
        });
    }

    async onFilterAction() {
        var listErrorLevel = this.state.listErrorLevel, listSite = this.state.listSite, curItem = this.state.curItem;
        if (!Libs.isArrayData(listErrorLevel)) return;
        var dataErrorState = listErrorLevel.filter((item) => item.active == 1);
        var id_sites = listSite.filter((item) => item.active == 1);
        if(curItem.column == 2){
            if(!Libs.isArrayData(id_sites)){
                return;
            }
        } else if(curItem.column == 1){
            if(!Libs.isArrayData(dataErrorState)){
                return;
            }
        }
        this.props.callBackFilter(dataErrorState, id_sites);
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
                }, () => {
                    $('.scrollbar-inner').scrollbar();
                });
            } else {
                self.setState({
                    listErrorLevel: []
                });
            }
        });
    }


    /**
     * Get list error level
     * @author long.pham 2021-01-28
     * @return array
     */

    getListSite() {
        let self = this;
        var id_sites = this.admin.id_sites, list_sites = [];
        if (!Libs.isBlank(id_sites)) {
            var sites = id_sites.split(",");
            if (sites.length > 0) {
                for (var i = 0; i < sites.length; i++) {
                    var item = {
                        id: sites[i]
                    };
                    list_sites.push(item);
                }
            }
        }

        var params = {
            id_sites: list_sites
        };
        AlertService.instance.getListIdSites(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    listSite: data
                }, () => {
                    $('.scrollbar-inner').scrollbar();
                });
            } else {
                self.setState({
                    listErrorLevel: []
                });
            }
        });
    }

}
export default FilterPopup;