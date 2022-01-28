
import React, { useState } from 'react';
import "./Table.css";

function Table({ list }) {
    const [listSize, setListSize] = useState(10);
    const [listDisplayAction, setAction] = useState("See More");
    const globalDataListSize = list.length;

    const handleListSize = () => {
        (listDisplayAction !== "See More") ? setListSize(10) : setListSize(listSize + 20);
        if (listSize + 20 >= globalDataListSize) {
            setAction("See Less");
        }
        if (listSize >= globalDataListSize) {
            setAction("See More");
        }
    }

    return (
        <div className='Table'>
            <div className="table__name">Countries Affected</div>
            <div className='table__container'>
                <div className="table__heading">
                    <div id="th__countryname" className="table__data">Country</div>
                    <div id="th__activecases" className="table__data">Active Cases</div>
                    <div id="th__cases" className="table__data">Total Cases</div>
                    <div id="th__recovered" className="table__data">Recovered</div>
                    <div id="th__deaths" className="table__data">Deaths</div>
                </div>
                {list.sort((a, b) => (a.cases < b.cases ? 1 : -1)).slice(0, listSize).map((dataElements, index) => {
                        return (
                            <div className="table__list" key={index}>
                                <div id="tr__countryname" className="table__data">
                                    <img src={dataElements.countryInfo.flag} alt="" className="flag" />
                                    <span>{dataElements.country}</span>
                                </div>
                                <div id="tr__activecases" className="table__data">{dataElements.active}</div>
                                <div id="tr__cases" className="table__data">{dataElements.cases}</div>
                                <div id="tr__recovered" className="table__data">{dataElements.recovered}</div>
                                <div id="tr__deaths" className="table__data">{dataElements.deaths}</div>
                            </div>
                        );
                    })}
            </div>
            <div className="showmore__button">
                <button className="showmore__text" onClick={handleListSize}>{listDisplayAction}</button>
            </div>
        </div>
    );
}

export default Table;