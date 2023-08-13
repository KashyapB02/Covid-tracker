import React, { useEffect, useState, useReducer } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import "./App.css";
import reducer, { defaultState } from "./reducer";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  console.log(state);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            id: country.countryInfo.iso3,
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          dispatch({ type: "FETCH_COUNTRIES", payload: { countries, data } });
        });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
    const fetchGlobalData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "FETCH_GLOBAL", payload: data });
        });
    };

    fetchGlobalData();
  }, []);

  const onCountryChange = (e) => {
    if (e.target.value === "Worldwide") {
      dispatch({
        type: "COUNTRY_CHANGE",
        payload: {
          name: "Worldwide",
          bool: false,
          center: { lat: 23.512, lng: 80.329 },
        },
      });
    } else {
      const individualData = state.tableData.find((element) => {
        return element.country === e.target.value;
      });

      dispatch({
        type: "COUNTRY_CHANGE",
        payload: {
          bool: true,
          center: {
            lat: individualData.countryInfo.lat,
            lng: individualData.countryInfo.long,
          },
          zoom: 4,
          box: individualData,
          country: e.target.value,
        },
      });
    }
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={state.selectedCountry} onChange={onCountryChange}>
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {state.allCountries.map((c) => (
                <MenuItem key={c.id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            onClick={() => dispatch({ type: "SET_CASE_TYPES", payload: "cases" })}
            title="Coronavirus Cases"
            isRed
            active={state.casesType === "cases"}
            cases={state.isSelected ? state.infoBox.todayCases : state.globalData.todayCases}
            total={state.isSelected ? state.infoBox.cases : state.globalData.cases}
          />
          <InfoBox
            onClick={() => dispatch({ type: "SET_CASE_TYPES", payload: "recovered" })}
            title="Recovered"
            active={state.casesType === "recovered"}
            cases={
              state.isSelected ? state.infoBox.todayRecovered : state.globalData.todayRecovered
            }
            total={state.isSelected ? state.infoBox.recovered : state.globalData.recovered}
          />
          <InfoBox
            onClick={() => dispatch({ type: "SET_CASE_TYPES", payload: "deaths" })}
            title="Deaths"
            isRed
            active={state.casesType === "deaths"}
            cases={state.isSelected ? state.infoBox.todayDeaths : state.globalData.todayDeaths}
            total={state.isSelected ? state.infoBox.deaths : state.globalData.deaths}
          />
        </div>
        <Map
          country={state.isSelected ? state.infoBox : state.globalData}
          casesType={state.casesType}
          center={state.mapCenter}
          zoom={state.mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Countries</h3>
            <Table countries={state.tableData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
