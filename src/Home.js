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
            <div className="container">
                <div className="global__cases__display">
                    <div className="global__title">
                        <span className="global__title__text">
                            <img src={live} alt="" className="global__title__logo" />
                            Live Stats Overview
                        </span>
                        <span className="global__title__text">
                            <img src={global} alt="" className="global__title__logo" />
                            Global
                        </span>
                    </div>
                    <div className="global__container">
                        <Global list={countrywiseDataList} casetype="Today" />
                        <div className="empty empty__reponsive"></div>
                        <Global list={countrywiseDataList} casetype="Overall" />
                    </div>
                </div>
                <aside className="country__cases__display">
                    <div className="country__select__container">
                        <img src={countryFlag} alt="" id="country__flag" />
                        <select className='country__list' value={selectedCountry} onChange={fetchCountryData}>
                            {countrywiseDataList.map((dataElement) => {
                                return (
                                    <option key={dataElement.country} value={dataElement.country}>{dataElement.country}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className='country__container'>
                        <Country data={selectedCountryData} casetype="Today" />
                        <div className="empty empty__reponsive"></div>
                        <Country data={selectedCountryData} casetype="Overall" />
                    </div>
                </aside>
            </div>
            <div className="container">
                <Table list={countrywiseDataList} />
            </div>
        </div>
    );
}

export default Home;