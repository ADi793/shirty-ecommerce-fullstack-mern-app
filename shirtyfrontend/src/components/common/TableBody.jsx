import React from "react";
import _ from "lodash";

function TableBody({ data, columns }) {
  const renderCellContent = (column, item) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={item._id + (column.key || column.path)}>
              {renderCellContent(column, item)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
