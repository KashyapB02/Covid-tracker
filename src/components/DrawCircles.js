import React from "react";
import { Circle, Popup } from "react-leaflet";

const colorList = {
  cases: {
    color: "#CC1034",
    size: 500,
  },
  recovered: {
    color: "#7dd71d",
    size: 800,
  },
  deaths: {
    color: "#fb4443",
    size: 1000,
  },
};

export const showDataOnMap = (country, casesType = "cases") => {
  console.log(country);
  if (JSON.stringify(country) === "{}") {
    return <></>;
  }

  if (country.countryInfo) {
    return (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={colorList[casesType].color}
        fillColor={colorList[casesType].color}
        fillOpacity={0.4}
        radius={Math.sqrt(country[casesType]) * colorList[casesType].size}
      >
        <Popup>
          <div>
            <div>{country.country}</div>
            <div>Cases: {country.cases}</div>
            <div>Recovered: {country.recovered}</div>
            <div>Deaths: {country.deaths}</div>
          </div>
        </Popup>
      </Circle>
    );
  }

  return <></>;
};
