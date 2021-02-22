import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Libs from '../../../../utils/Libs';
import { NavLink } from 'react-router-dom';

export default function () {
  var { dataList, showIconHover, showInfoWindow } = this.state;
  var positionCenter = {
    lat: 38.609784, lng: -103.514553
  };

  var rowItemMaps = null, icon = "/assets/images/place.png", iconHover = "/assets/images/place-hover.png";
  if (Libs.isArrayData(dataList)) {
    var count = 0, zIndex = 1;
    rowItemMaps = dataList.map((item, index) => {
      if (!Libs.isBlank(item.lat) && !Libs.isBlank(item.lng)) {
        if (count == 0) {
          positionCenter.lat = parseFloat(item.lat);
          positionCenter.lng = parseFloat(item.lng);
        }

        count++;
        return <Marker
          key={'row_item_' + index}
          index={index}
          position={{ lat: parseFloat(item.lat), lng: parseFloat(item.lng) }}
          onClick={this.handleMouseOver.bind(this, item)}
          onMouseOver={this.onMouseoverMarker.bind(this, item)}
          onMouseOut={this.mouseMoveOutOfMarker.bind(this, item)}
          icon={showIconHover == item ? iconHover : icon}
          zIndex={zIndex}
        >
          {showInfoWindow && showInfoWindow == item && (
            <InfoWindow onCloseClick={this.handleMouseExit.bind(this, item)} >
              <div className="info-window">
                <NavLink to={"/client/" + item.id} title={item.name} >
                  {item.name}
                </NavLink>
              </div>

            </InfoWindow>
          )}
        </Marker>
      }
    });
  }

  return (
    <LoadScript id="script-loader" googleMapsApiKey={Constants.GOOLGE_APP.KEY} >
      <GoogleMap id='map' zoom={5} center={positionCenter} >
         {rowItemMaps}
      </GoogleMap>
    </LoadScript>
  )
}