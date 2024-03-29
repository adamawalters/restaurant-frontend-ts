import { Link } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";
import { ReservationUpdate } from "../types";

type ReservationRowProps = {
  reservation: ReservationUpdate,
  loadReservations: (signal?: AbortSignal)=>Promise<void>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}

function ReservationRow({ reservation, loadReservations, setError }: ReservationRowProps) {
  async function cancelReservation(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const canCancel = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (canCancel) {
      try {
        await updateReservationStatus(reservation.reservation_id, "cancelled");
        await loadReservations();
      } catch (error) {
        if(error instanceof Error) setError(error);
      }
    }
  }

  return (
    <tr>
      <td className="d-none d-md-table-cell align-middle">
        {reservation.reservation_id}
      </td>
      <td className="align-middle">{reservation.first_name}</td>
      <td className="align-middle">{reservation.last_name}</td>
      <td className="align-middle">{reservation.mobile_number}</td>
      <td className="align-middle">{reservation.reservation_date}</td>
      <td className="align-middle">{reservation.reservation_time}</td>
      <td className="align-middle">{reservation.people}</td>
      <td className="align-middle">
        <span data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </span>
      </td>
      <td className="col-md-2 align-middle text-center">
        {reservation.status === "booked" ? (
          <Link
            className="btn btn-primary btn-sm"
            to={`/reservations/${reservation.reservation_id}/seat`}
          >
            Seat
          </Link>
        ) : null}
        <Link
          className="ml-1 btn btn-info btn-sm"
          to={`/reservations/${reservation.reservation_id}/edit`}
        >
          Edit
        </Link>
        <Link
          to=""
          className="ml-1 btn btn-danger btn-sm"
          data-reservation-id-cancel={reservation.reservation_id}
          onClick={cancelReservation}
        >
          Cancel
        </Link>
      </td>
    </tr>
  );
}

export default ReservationRow;
