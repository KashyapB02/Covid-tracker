import React from "react";
import "./Table.css";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((c) => (
        <tr key={c.countryInfo.iso3}>
          <span className="flag__container">
            <img className="flag" src={c.countryInfo.flag} alt={c.country} />
            <td>{c.country}</td>
          </span>
          <td>
            <strong>{c.active}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
