import React, { useEffect } from 'react';

const Field = () => {
  const createField = (rows: number, columns: number) => {
    const field = document.querySelector('.field');
    for (let r = 1; r <= rows; r++) {
      const row = document.createElement('ul');
      row.className = 'field_list';

      for (let c = 1; c <= columns; c++) {
        const column = document.createElement('li');
        column.className = 'field_bar';
        column.dataset.bar = c + '';
        column.dataset.row = r + '';
        row.appendChild(column);
      }
      field.appendChild(row);
    }
  };
  useEffect(() => {
    createField(5, 8);
  }, []);

  return <div className="field"></div>;
};

export default Field;
