import { useCallback, useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../Layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList";
import ReservationListNav from "../ui-elements/ReservationListNav";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";
import TableList from "../table/TableList";
import { ReservationUpdate } from "../types";


function Dashboard() {
  const [reservations, setReservations] = useState<Array<ReservationUpdate>  | null>(null);
  const [reservationsError, setReservationsError] = useState<null | Error >(null);
  const queryParams = useQuery();
  const initialDate = queryParams.get("date") || today();
  const [date, setDate] = useState(initialDate);

  const loadReservations = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const response = await listReservations({ date }, signal);
        setReservations(response);
      } catch (error) {
        if(error instanceof Error) {
          setReservationsError(error);
        }
      }
    },
    [date]
  );

  useEffect(() => {
    const abortController = new AbortController();
    setReservations(null);
    setReservationsError(null);

    loadReservations(abortController.signal);
    return () => abortController.abort();
  }, [date, loadReservations]);

  if (reservations) {
    return (
      <main style={{ height: "100%", overflow: "hidden" }}>
        <h1>Dashboard</h1>
        <ErrorAlert error={reservationsError} />
        <div className="card mb-4 box-shadow">
          <div className="card-header py-0">
            <div className="d-flex mb-0 justify-content-center">
              <h5 className="mb-0">Reservations for {date}</h5>
            </div>
          </div>
          <div className="card-header py-0">
            <ReservationListNav date={date} setDate={setDate} />
          </div>
          <div className="card-body p-0">
            <ReservationList
              setError={setReservationsError}
              reservations={reservations}
              loadReservations={loadReservations}
            />
          </div>
        </div>
        <div className="card mb-4 box-shadow">
          <div className="card-header py-0">
            <div className="d-flex mb-0 justify-content-center">
              <h5 className="mb-0">Restaurant Table Status</h5>
            </div>
          </div>
          <div className="card-body p-0">
            <TableList
              loadReservations={loadReservations}
              setError={setReservationsError}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3 justify-content-center">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationListNav date={date} setDate={setDate} />
      <div className="d-flex justify-content-center">
        <h2 className="font-italic">Reservations loading</h2>
      </div>
    </main>
  );
}

export default Dashboard;
