
import React from 'react';
import { NavLink } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}
import Libs from '../../../utils/Libs';

export default function () {
  var { chartOption, curItem, dataList } = this.state;
  var rowItems = null, total = 0, total_jan = 0, total_feb = 0, total_mar = 0, total_apr = 0, total_may = 0, total_jun = 0, total_jul = 0, total_aug = 0, total_sep = 0, total_oct = 0, total_now = 0, total_dec = 0;
  if (Libs.isArrayData(dataList)) {
    rowItems = dataList.map((item, index) => {
      total = total + item.year_total;
      total_jan = total_jan + item.jan_kwh_total;
      total_feb = total_feb + item.feb_kwh_total;
      total_mar = total_mar + item.mar_kwh_total;
      total_apr = total_apr + item.apr_kwh_total;
      total_may = total_may + item.may_kwh_total;
      total_jun = total_jun + item.jun_kwh_total;
      total_jul = total_jul + item.jul_kwh_total;
      total_aug = total_aug + item.aug_kwh_total;
      total_sep = total_sep + item.sep_kwh_total;
      total_oct = total_oct + item.oct_kwh_total;
      total_now = total_now + item.nov_kwh_total;
      total_dec = total_dec + item.dec_kwh_total;
      return <tr key = {index}>
        <td className="text-left">{item.year}</td>
        <td className="text-right">{!Libs.isBlank(item.jan_kwh_total) && item.jan_kwh_total > 0 ? item.jan_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.feb_kwh_total) && item.feb_kwh_total > 0 ? item.feb_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.mar_kwh_total) && item.mar_kwh_total > 0 ? item.mar_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.apr_kwh_total) && item.apr_kwh_total > 0 ? item.apr_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.may_kwh_total) && item.may_kwh_total > 0 ? item.may_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.jun_kwh_total) && item.jun_kwh_total > 0 ? item.jun_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.jul_kwh_total) && item.jul_kwh_total > 0 ? item.jul_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.aug_kwh_total) && item.aug_kwh_total > 0 ? item.aug_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.sep_kwh_total) && item.sep_kwh_total > 0 ? item.sep_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.oct_kwh_total) && item.oct_kwh_total > 0 ? item.oct_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.nov_kwh_total) && item.nov_kwh_total > 0 ? item.nov_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.dec_kwh_total) && item.dec_kwh_total > 0 ? item.dec_kwh_total : '-'}</td>
        <td className="text-right">{!Libs.isBlank(item.year_total) && item.year_total > 0 ? item.year_total : '-'}</td>
      </tr>
    })
  }

  return (
    <section className="comparison">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item"><NavLink to={"/client/" + curItem.id}>{curItem.name}</NavLink></li>
              </ol>
            </nav>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="title">Annual Comparison <a className="export-csv">Export to csv</a></div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="data_comparison">
              <div className="chart_comparison">
                {!Libs.isObjectEmpty(chartOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOption} /> : ""}
              </div>
              {rowItems ?
                <div className="yield-table">
                  <h4>Total yield [MWh]</h4>
                  <table className="table" id="DataTableComparison">
                    <thead>
                      <tr>
                        <th></th>
                        <th className="text-right">January</th>
                        <th className="text-right">February</th>
                        <th className="text-right">March</th>
                        <th className="text-right">April</th>
                        <th className="text-right">May</th>
                        <th className="text-right">June</th>
                        <th className="text-right">July</th>
                        <th className="text-right">August</th>
                        <th className="text-right">September</th>
                        <th className="text-right">October</th>
                        <th className="text-right">November</th>
                        <th className="text-right">December</th>
                        <th className="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rowItems}

                      <tr>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right total"><strong>{total}</strong></td>
                      </tr>
                      <tr>
                        <td className="text-left">Mean value</td>
                        <td className="text-right">{!Libs.isBlank(total_jan) && total_jan > 0 ? Libs.formatNum(total_jan/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_feb) && total_feb > 0 ? Libs.formatNum(total_feb/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_mar) && total_mar > 0 ? Libs.formatNum(total_mar/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_apr) && total_apr > 0 ? Libs.formatNum(total_apr/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_may) && total_may > 0 ? Libs.formatNum(total_may/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_jun) && total_jun > 0 ? Libs.formatNum(total_jun/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_jul) && total_jul > 0 ? Libs.formatNum(total_jul/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_aug) && total_aug > 0 ? Libs.formatNum(total_aug/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_sep) && total_sep > 0 ? Libs.formatNum(total_sep/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_oct) && total_oct > 0 ? Libs.formatNum(total_oct/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_now) && total_now > 0 ? Libs.formatNum(total_now/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total_dec) && total_dec > 0 ? Libs.formatNum(total_dec/dataList.length, "#,###.##", 2): 0}</td>
                        <td className="text-right">{!Libs.isBlank(total) && total > 0 ? Libs.formatNum(total/dataList.length, "#,###.##", 2): 0}</td>
                      </tr>
                      <tr>
                        <td className="text-left">Year portion</td>
                        <td className="text-right">{Libs.formatNum((total_jan / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_feb / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_mar / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_apr / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_may / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_jun / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_jul / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_aug / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_sep / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_oct / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_now / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">{Libs.formatNum((total_dec / total) * 100, "#,###.##", 2)}%</td>
                        <td className="text-right">100.00%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}