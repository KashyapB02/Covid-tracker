import React from 'react';
import "./Global.css";

function Global({ list, casetype }) {
    let overallCases = 0;
    let overallRecovered = 0;
    let overallDeaths = 0;
    let todayCases = 0;
    let todayRecovered = 0;
    let todayDeaths = 0;

    const listLength = list.length;

    for (var i = 0; i < listLength; i++) {
        overallCases += list[i].cases;
        overallRecovered += list[i].recovered;
        overallDeaths += list[i].deaths;
        todayCases += list[i].todayCases;
        todayRecovered += list[i].todayRecovered;
        todayDeaths += list[i].todayDeaths;
    }

    return (
        <div className='Global'>
            <div className="global__data__display">
                <div id="cases__number" className="global__data__number">{(casetype === "Today") ? (todayCases.toLocaleString('en-US')) : (overallCases.toLocaleString('en-US'))}</div>
                <div id="cases__text" className="global__data__text">Total Confirmed {casetype}</div>
            </div>
            <div className="global__data__display">
                <div id="recovered__number"  className="global__data__number">{(casetype === "Today") ? (todayRecovered.toLocaleString('en-US')) : (overallRecovered.toLocaleString('en-US'))}</div>
                <div id="recovered__text" className="global__data__text">Total Recovered {casetype}</div>
            </div>
            <div className="global__data__display">
                <div id="deaths__number"  className="global__data__number">{(casetype === "Today") ? (todayDeaths.toLocaleString('en-US')) : (overallDeaths.toLocaleString('en-US'))}</div>
                <div id="deaths__text" className="global__data__text">Total Deaths {casetype}</div>
            </div>
        </div>
    );
}

export default Global;