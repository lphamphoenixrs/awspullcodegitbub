import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import RowItem from './RowItem';
import Libs from '../../../utils/Libs';
import { Pagging } from '../../../component/Pagging';
import FLSelect from '../../../component/FLSelect';

export default function () {
  var { dataList, dataFilter, curItem } = this.state;
  const options = {
    data: {
      table: 'datatable'
    },
    chart: {
      type: 'column',
      height: 300
    },


    title: {
      text: 'Day',
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
      categories: ['3.Sep']
    },

    yAxis: {
      allowDecimals: false,
      title: {
        text: 'KWH'
      }
    },

    series: [
      {
        "name": "Measured (82 MWh)",
        data: [60]
      },

      {
        "name": "Expected (49 MWh)",
        data: [20]
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
                    <li className="one">Installed Capacity: <span>20.87 MW</span></li>
                  </ul>
                </div>

                <div className="main_info">
                  <div className="title">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-4"><a className="active">Today</a></div>
                      <div className="col-xl-4 col-lg-4 col-md-4"><a>This month</a></div>
                      <div className="col-xl-4 col-lg-4 col-md-4"><a>last month</a></div>
                    </div>
                  </div>
                  <div className="performance_chart">
                    <HighchartsReact highcharts={Highcharts} options={options} />
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
                          <td>81.76 MWh</td>
                          <td>49.45 MWh</td>
                          <td>	165.3%</td>
                        </tr>
                        <tr>
                          <td>This Month</td>
                          <td>231.73 MWh</td>
                          <td>148.36 MWh</td>
                          <td>156.2%</td>
                        </tr>
                        <tr>
                          <td>Last Month</td>
                          <td>.5 GWh</td>
                          <td>1.77 GWh</td>
                          <td>141.3%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7">
                <div className="cell_title">
                  <ul>
                    <li>Total Sites: <span>56</span></li>
                    <li>Open Alerts: <span><a target="_blank" href="#">111</a></span></li>
                  </ul>
                </div>

                <div className="main_chart">
                  <LoadScript id="script-loader" googleMapsApiKey={Constants.GOOLGE_APP.KEY} >
                    <GoogleMap id='map' zoom={8} center={{ lat: 10.7546664, lng: 106.4150367 }} >
                      <Marker position={{ lat: 10.7546664, lng: 106.4150367 }} />
                    </GoogleMap>
                  </LoadScript>
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
                                id="filter"
                                className="filter"
                                name="filter"
                                options={dataFilter}
                                placeholderText={trans.translate('common.choose')}
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
                                  name="sort"
                                  id="asc"
                                  className="asc"
                                  checked={curItem.sort == 1 ? true : false}
                                  value={1} />
                                <span className="checkmark"></span> Ascending
                                        </label>
                            </li>

                            <li className="sort_type">
                              <label className="radio-cm-round">
                                <input type="radio"
                                  onChange={(e) => { this.handleInputChange(e); }}
                                  name="sort"
                                  id="desc"
                                  className="desc"
                                  checked={curItem.sort == 2 ? true : false}
                                  value={2} />
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
                <div className="content">
                  <div className="main_header">
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
                      <div className="item-col width8 text-center"><div className="middle"><span>RRADIANCE</span></div> </div>
                      <div className="item-col width8 text-center"><div className="middle"><span>TODAY</span></div> </div>
                      <div className="item-col width8 text-center"> <div className="middle"><span>LIFETIME</span></div></div>
                      <div className="item-col width8 text-center"><div className="middle"><span>LAST MONTH</span></div></div>
                      <div className="item-col width8 text-center"><div className="middle"><span>THIS MONTH</span></div></div>
                    </div>

                  </div>
                  <div className="body">
                    {rowItems}
                  </div>

                  <div className="box-footer">
                    <Pagging total={this.pagging.total} current={this.pagging.current} onSelectPage={(index) => this.onSelectPage.bind(this, index)}></Pagging>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}