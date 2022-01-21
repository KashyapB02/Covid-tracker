import React from 'react';
import "./Country.css";

function Country({ data, casetype }) {
    return (
        <div className="Country">
            <div id="countywise__cases" className="countrywise__data__display">
                <div className="countrywiseDataText">Confirmed {casetype}:</div>
                <div className="countrywise__data__number">{(casetype === "Today") ? (data.todayCases) : (data.cases)}</div>
            </div>
            <div id="countywise__recovered" className="countrywise__data__display">
                <div className="countrywiseDataText">Recovered {casetype}:</div>
                <div className="countrywise__data__number">{(casetype === "Today") ? (data.todayRecovered) : (data.recovered)}</div>
            </div>
            <div id="countywise__deaths" className="countrywise__data__display">
                <div className="countrywiseDataText">Deaths {casetype}:</div>
                <div className="countrywise__data__number">{(casetype === "Today") ? (data.todayDeaths) : (data.deaths)}</div>
            </div>
        </div>
    );
}

export default Country;