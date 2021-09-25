import React from 'react';
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table({ columns, data }) {
    return (
        <div className="table-responsive">
        <table
          className="
              table table-bordered table-sm table-striped table-hover
              text-muted
            "
        >
          <TableHeader columns={columns} />
          <TableBody data={data} columns={columns} />
        </table>
      </div>
    );
}

export default Table;