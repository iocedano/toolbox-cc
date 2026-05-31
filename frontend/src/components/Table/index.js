import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';


function Table({ headers=[], children=[] }) {
  return (
  <BootstrapTable striped bordered className="table-component">
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
  </BootstrapTable>
)}

export default Table;

