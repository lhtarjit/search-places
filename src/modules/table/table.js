import React from "react";
import "./Table.css";
import Spinner from "../spinner/Spinner";

const Table = ({ data, loading }) => {
  return (
    <div className="table-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {data.length === 0 ? (
            <div className="no-result">No result found</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Place Name</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
