import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  listAvailableTables,
  listReservation,
  updateTable,
} from "../utils/api";
import ErrorAlert from "../Layout/ErrorAlert";
import {
  useNavigate,
  useParams,
} from "react-router-dom"
import SeatReservationList from "./SeatReservationList";
import { ReservationUpdate, TableUpdate } from "../types";

function SeatReservation() {
  const [tables, setTables] = useState<Array<TableUpdate>>([]);
  const [tablesError, setTablesError] = useState<null | {message: string}>(null);
  const [selectedTableID, setSelectedTableID] = useState<number>(0);
  const [reservation, setReservation] = useState<null | ReservationUpdate>(null);
  const reservation_id  = Number(useParams().reservation_id!);
  const navigate = useNavigate();

  async function addReservationToTable() {
    try {
      await updateTable(selectedTableID, reservation_id);
      navigate(`/`);
    } catch (error) {
      if(error instanceof Error) setTablesError(error);
    }
  }

  function validateTable(e: FormEvent<HTMLFormElement>) {
    if(!reservation) return;
    e.preventDefault();
    setTablesError(null);
    let errorString = "";
    const selectedTable = tables.find(
      (table) => table.table_id === selectedTableID
    );
    if (reservation.people > selectedTable!.capacity) {
      errorString += `Table capacity must be greater than or equal to reservation size.`;
    }
    if (reservation.status === "seated") {
      errorString += `Reservation ${reservation.reservation_id} is already seated.`;
    }
    errorString
      ? setTablesError({ message: errorString })
      : addReservationToTable();
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedTableID(Number(e.target.value));
  }

  /*Load reservation list */
  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservation() {
      try {
        const response = await listReservation(
          reservation_id,
          abortController.signal
        );
        setReservation(response);
      } catch (error) {
        if(error instanceof Error) setTablesError(error);
      }
    }
    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  /* Load available tables from DB */
  useEffect(() => {
    const abortController = new AbortController();
    async function loadAvailableTables() {
      try {
        const response = await listAvailableTables(abortController.signal);
        setTables(response);
      } catch (error) {
        if(error instanceof Error) setTablesError(error);
      }
    }

    loadAvailableTables();
    return () => abortController.abort();
  }, []);

  const options = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <main>
      <h1>Seat Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">{`Assign a table to reservation ${reservation_id}`}</h4>
      </div>
      <ErrorAlert error={tablesError} />
      {reservation ? (
        <>
          <h4>Reservation Information</h4>
          <SeatReservationList reservation={reservation} />
        </>
      ) : null}
      <h4> Choose a table </h4>
      <form onSubmit={validateTable} >
        <div className="form-group">
          <select
            className="form-control"
            name="table_id"
            value={selectedTableID}
            onChange={handleChange}
            required
          >
            <option value={0}>None</option>
            {options}
          </select>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

export default SeatReservation;
