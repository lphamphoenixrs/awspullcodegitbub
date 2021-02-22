import React from 'react';
import Libs from '../../../utils/Libs';
import RowItem from './RowItem';
export default function () {
  var { dataList } = this.state;
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
    <section className="main-home">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Error</th>
            <th scope="col">Low alarm</th>
            <th scope="col">High alarm</th>
            <th scope="col">ION6200 (KWh)</th>
            <th scope="col">ION6200 demand (kW)</th>
          </tr>
        </thead>
        <tbody>
          {rowItems}
        </tbody>
      </table>
    </section>
  )
}