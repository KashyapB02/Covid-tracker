import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./DrawCircles";
import "./Map.css";

function Map({ country, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png" />
        {showDataOnMap(country, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
