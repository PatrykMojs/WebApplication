import React from "react";
import { Link } from 'react-router-dom';
import './TableCurriencesComponent.css';

const TableCurrenciesComponent = ({ value }) => {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Waluta</th>
              <th>Kod</th>
              <th>Średni kurs</th>
            </tr>
          </thead>
          <tbody>
            {value.map((object, index) => (
              <tr key={index}>
                <td className="linkToDetails">
                  <Link to={`/detailsCurrency/${object.code}`}>{object.currency}</Link>
                </td>
                <td>{object.code}</td>
                <td>{object.mid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableCurrenciesComponent;