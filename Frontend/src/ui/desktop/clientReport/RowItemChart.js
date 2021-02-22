import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import HighchartsExporting from 'highcharts/modules/exporting';
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}
class RowItemChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var chartOption = this.props.chartOption;
    return (
      <HighchartsReact highcharts={Highcharts} immutable = {true} options={chartOption} />
    );
  }
}
export default RowItemChart;

