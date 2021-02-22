import React from 'react';
import Highcharts from 'highcharts';
import { NavLink } from 'react-router-dom';
import HighchartsReact from 'highcharts-react-official';
import RowItem from './RowItem';
import Libs from '../../../utils/Libs';
import { Pagging } from '../../../component/Pagging';
import FLSelect from '../../../component/FLSelect';
import Map from './map/Map';

export default function () {
  var { curItem, dataList, dataFilter, searchParam, chart_filter } = this.state;
  var measured = 0, expected = 0, titleMeasured ='', titleExpected = '', title = '', categoriesItem = '';
  switch (chart_filter) {
    case "today":
      categoriesItem = curItem.today;
      measured = curItem.measured_today;
      expected = curItem.expected_today;
      titleMeasured = "Measured ("+ Libs.formatElectricalPowerUnit(curItem.measured_today, 'h') + ")";
      titleExpected = "Expected  "+ Libs.formatElectricalPowerUnit(curItem.expected_today, 'h') + ")";
      title = "Today";
      break;
    case "this_month":
      categoriesItem = curItem.this_month;
      measured = curItem.measured_this_month;
      expected = curItem.expected_this_month;
      titleMeasured = "Measured ("+ Libs.formatElectricalPowerUnit(curItem.measured_this_month, 'h') + ")";
      titleExpected = "Expected  "+ Libs.formatElectricalPowerUnit(curItem.expected_this_month, 'h') + ")";
      title = "This month";
      break;
    case "last_month":
      categoriesItem = curItem.last_month;
      measured = curItem.measured_last_month;
      expected = curItem.expected_last_month;
      titleMeasured = "Measured ("+ Libs.formatElectricalPowerUnit(curItem.measured_last_month, 'h') + ")";
      titleExpected = "Expected  "+ Libs.formatElectricalPowerUnit(curItem.expected_last_month, 'h') + ")";
      title = "Last month";
      break;
  }
  
  const options = {
    credits: { enabled: false },
    data: {
      table: 'datatable'
    },
    chart: {
      type: 'column',
      height: 300
    },


    title: {
      text: title,
      verticalAlign: "bottom"
    },

    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      borderWidth: 0,
      showInLegend: false
    },

    xAxis: {
      categories: [categoriesItem]
    },

    yAxis: {
      allowDecimals: false,
      title: {
        text: 'KWH'
      }
    },

    series: [
      {
        "name": titleMeasured,
        data: [measured]
      },

      {
        "name": titleExpected,
        data: [expected]
      }

    ]
  };

  var rowItems = null;
  if (Libs.isArrayData(dataList)) {
    rowItems = dataList.map((item, index) => {
      return <RowItem
        key={'row_item_' + index}
        index={index}
        dataItem={item}
      />
    });
  }

  return (
    <section className="dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-5">
                <div className="cell_title">
                  <ul>
                    <li className="one">Installed Capacity: <span>{Libs.formatElectricalPowerUnit(curItem.installed_capacity)}</span></li>
                  </ul>
                </div>

                <div className="main_info">
                  <div className="title">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-4"><a onClick={this.onChangeChart.bind(this, 'today')} className={this.state.chart_filter == 'today' ? "active" : ""}>Today</a></div>
                      <div className="col-xl-4 col-lg-4 col-md-4"><a onClick={this.onChangeChart.bind(this, 'this_month')} className={this.state.chart_filter == 'this_month' ? "active" : ""}>This month</a></div>
                      <div className="col-xl-4 col-lg-4 col-md-4"><a onClick={this.onChangeChart.bind(this, 'last_month')} className={this.state.chart_filter == 'last_month' ? "active" : ""}>last month</a></div>
                    </div>
                  </div>
                  <div className="performance_chart">
                    <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={options} />
                  </div>
                  <div className="performance_table">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Measured Energy</th>
                          <th>Expected Energy</th>
                          <th>EER</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Today</td>
                          <td>{Libs.formatElectricalPowerUnit(curItem.measured_today, 'h')}</td>
                          <td>{Libs.formatElectricalPowerUnit(curItem.expected_today, 'h')}</td>
                          <td>{!Libs.isBlank(curItem.err_today) && curItem.err_today > 0 ? curItem.err_today + "%" : ''}</td>
                        </tr>
                        <tr>
                          <td>This Month</td>
                          <td>{Libs.formatElectricalPowerUnit(curItem.measured_this_month, 'h')}</td>
                          <td>{Libs.formatElectricalPowerUnit(curItem.expected_this_month, 'h')}</td>
                          <td>{!Libs.isBlank(curItem.err_this_month) && curItem.err_this_month > 0 ? curItem.err_this_month + "%" : ''}</td>
                        </tr>
                        <tr>
                          <td>Last Month</td>
                          <td>{Libs.formatElectricalPowerUnit(curItem.measured_last_month, 'h')}</td>
                          <td>{Libs.formatElectricalPowerUnit(curItem.expected_last_month, 'h')}</td>
                          <td>{!Libs.isBlank(curItem.err_last_month) && curItem.err_last_month > 0 ? curItem.err_last_month + "%" : ''}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7">
                <div className="cell_title">
                  <ul>
                    <li>Total Sites: <span>{curItem.total_site}</span></li>
                    <li>Open Alerts: <span><NavLink to="/alerts">{curItem.total_error}</NavLink></span></li>
                  </ul>
                </div>

                <div className="main_chart">
                  {Libs.isArrayData(dataList) ? <Map dataList={dataList} /> : ''}
                </div>
              </div>

            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="list">
              <div className="filter">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6"><div className="title">List site</div></div>
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="box_sort">
                      <div className="row">
                        <div className="col-md-7">
                          <ul>
                            <li>Sort by</li>
                            <li>
                              <FLSelect
                                id="order_by"
                                className="order_by"
                                name="order_by"
                                options={dataFilter}
                                selectedValue={searchParam.order_by}
                                placeholderText={trans.translate('common.choose')}
                                onSelect={this.handleInputChange.bind(this)}
                              />
                            </li>
                          </ul>


                        </div>

                        <div className="col-md-5">

                          <ul>
                            <li className="sort_type">
                              <label className="radio-cm-round">
                                <input type="radio"
                                  onChange={(e) => { this.handleInputChange(e); }}
                                  name="sort_by"
                                  id="asc"
                                  className="asc"
                                  checked={searchParam.sort_by == "ASC" ? true : false}
                                  value="ASC" />
                                <span className="checkmark"></span> Ascending
                                        </label>
                            </li>

                            <li className="sort_type">
                              <label className="radio-cm-round">
                                <input type="radio"
                                  onChange={(e) => { this.handleInputChange(e); }}
                                  name="sort_by"
                                  id="desc"
                                  className="desc"
                                  checked={searchParam.sort_by == "DESC" ? true : false}
                                  value="DESC" />
                                <span className="checkmark"></span> Descending
                                        </label>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main">
                <div className="content_dashboard">
                  <div className="dashboar_main_header">
                    <div className="item-row">
                      <div className="item-col width68"></div>
                      <div className="item-col width16 text-center">Energy</div>
                      <div className="item-col width16 text-center">EER</div>
                    </div>

                    <div className="item-row">
                      <div className="item-col width31 text-center"> <div className="middle"><span>NAME</span></div> </div>
                      <div className="item-col width5 text-center"></div>
                      <div className="item-col width8 text-center"><div className="middle"><span>ALERTS</span></div> </div>
                      <div className="item-col width8 text-center"><div className="middle"><span>DC CAPACITY</span></div> </div>
                      <div className="item-col width8 text-center"><div className="middle"><span>POWER</span></div> </div>
                      <div className="item-col width8 text-center"><div className="middle"><span>IRRADIANCE</span></div> </div>
                      <div className="item-col width8 text-center"><div className="middle"><span>TODAY</span></div> </div>
                      <div className="item-col width8 text-center"> <div className="middle"><span>LIFETIME</span></div></div>
                      <div className="item-col width8 text-center"><div className="middle"><span>LAST MONTH</span></div></div>
                      <div className="item-col width8 text-center"><div className="middle"><span>THIS MONTH</span></div></div>
                    </div>

                  </div>
                  <div className="body">
                    {rowItems}
                  </div>
                </div>

                <div className="box-footer">
                  <Pagging total={this.pagging.total} current={this.pagging.current} onSelectPage={(index) => this.onSelectPage.bind(this, index)}></Pagging>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}