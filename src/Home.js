import React, { useEffect, useState } from 'react';
import "./Home.css";
import Global from "./Global";
import Country from "./Country";
import Table from "./Table";
import live from "./Assets/Live.png";
import global from "./Assets/Global.png";

function Home() {
    const [countrywiseDataList, setCountrywiseData] = useState([]);
    const [selectedCountryData, setSelectedCountryData] = useState({});
    const [countryFlag, setFlag] = useState("https://disease.sh/assets/img/flags/in.png");
    const [selectedCountry, setSelectedCountry] = useState("India");

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/countries").then((response) => (response.json())).then((list) => setCountrywiseData(list));
    });

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/countries/IN").then((response) => (response.json())).then((country) => setSelectedCountryData(country));
    }, []);

    const fetchCountryData = (e) => {
        setSelectedCountry(e.target.value);
        const countryData = countrywiseDataList.find((data) => {
            return data.country === e.target.value;
        });
        setSelectedCountryData(countryData);
        setFlag(countryData.countryInfo.flag);
    };

    return (
        <div className='Home'>
            <div className="container__1">
                <div className="global__cases__display">
                    <div className="global__title">
                        <div className="global__title__text">
                            <img src={live} alt="" className="global__title__logo" />
                            Live Stats Overview
                        </div>
                        <div className="global__title__text">
                            <img src={global} alt="" className="global__title__logo" />
                            Global
                        </div>
                    </div>
                    <Global list={countrywiseDataList} casetype="Today" />
                    <Global list={countrywiseDataList} casetype="Overall" />
                </div>
                <aside className="country__cases__display">
                <div className="country__select__container"></div>
                    <img src={countryFlag} alt="" className="country__flag" />
                    <select className='country__list' value={selectedCountry} onChange={fetchCountryData}>
                        {countrywiseDataList.map((dataElement) => {
                            return (
                                <option key={dataElement.country} value={dataElement.country}>{dataElement.country}</option>
                            );
                        })}
                    </select>
                    <Country data={selectedCountryData} casetype="Today" />
                    <div className="empty"></div>
                    <Country data={selectedCountryData} casetype="Overall" />
                </aside>
            </div>
            <div className="container__2">
            <Table list={countrywiseDataList} />
            </div>
        </div>
    );
}

export default Home;