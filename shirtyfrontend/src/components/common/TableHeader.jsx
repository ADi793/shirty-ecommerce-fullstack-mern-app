import React from 'react';

function TableHeader({ columns }) {
    return (
        <thead>
        <tr>
            {columns.map(column => (
                <th key={column.key || column.path}>{column.label}</th>
            ))}
        </tr>
      </thead>
    );
}

export default TableHeader;