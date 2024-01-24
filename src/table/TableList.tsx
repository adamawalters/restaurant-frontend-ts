import React, { useEffect, useState, useCallback } from "react";
import { listTables } from "../utils/api";
import TableRow from "./TableRow";
import { TableUpdate } from "../types";

export type TableListProps = {
  loadReservations: (signal?: AbortSignal) => Promise<void>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}

function TableList({ loadReservations, setError }: TableListProps) {
  const [tables, setTables] = useState<Array<TableUpdate>>([]);

  const loadTables = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const response = await listTables(signal);
        setTables(response);
      } catch (error) {
        if(error instanceof Error) setError(error);
      }
    },
    [setError]
  );

  useEffect(() => {
    const abortController = new AbortController();

    loadTables(abortController.signal);
    return () => abortController.abort();
  }, [loadTables]);

  const tableHeader = (
    <tr>
      <th>ID</th>
      <th>Table Name</th>
      <th>Table Capacity</th>
      <th>Status</th>
      <th>Reservation ID</th>
      <th></th>
    </tr>
  );

  const tableRows = tables.map((table) => {
    return (
      <TableRow
        setError={setError}
        key={table.table_id}
        table={table}
        loadTables={loadTables}
        loadReservations={loadReservations}
      />
    );
  });

  return (
    <div style={{ maxHeight: "250px", overflow: "auto" }}>
      <table
        className="table table-striped table-hover table-sm"
        style={{ height: "100px" }}
      >
        <caption>List of tables</caption>
        <thead>{tableHeader}</thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default TableList;
