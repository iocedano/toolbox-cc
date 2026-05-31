import React from 'react';

function FileLine({ fileName, text, number, hex }) {
  return (
    <tr>
      <td>{fileName}</td>
      <td>{text}</td>
      <td>{number}</td>
      <td>{hex}</td>
    </tr>
  );
}

export default FileLine;    