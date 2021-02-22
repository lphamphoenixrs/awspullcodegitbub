/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

export default function () {
  var { dataList,showInfoWindow, showIconHover } = this.state;

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
          icon= {showIconHover == item ? iconHover : icon}
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


  let mapOptionsCreator = {
    mapTypeControlOptions: {
      position: 'BOTTOM_RIGHT' 
    }
  };

  return (
    <section className="maps">
      <h1 className="title">Map</h1>
      <LoadScript id="script-loader" googleMapsApiKey={Constants.GOOLGE_APP.KEY} >
        <GoogleMap id='map'
          options={mapOptionsCreator}
          zoom={5}
          center={positionCenter} >
          {rowItemMaps}
        </GoogleMap>
      </LoadScript>
    </section>
  )
}