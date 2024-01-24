import { FormEvent, useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";
import { useNavigate, useParams } from "react-router-dom";
import { listReservation, editReservation } from "../utils/api";
import ErrorAlert from "../Layout/ErrorAlert";
import { ReservationUpdate } from "../types";

export default function EditReservation() {
  const reservation_id  = Number(useParams().reservation_id!);
  const [error, setError] = useState<null | {message: string}>(null);
  const navigate = useNavigate();
  const [reservationForm, setReservationForm] =
    useState<ReservationUpdate | null>(null);
    
  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservation() {
      
      try {
        const response = await listReservation(
          reservation_id,
          abortController.signal
        );
        setReservationForm(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      }
    }

    loadReservation();

    return () => {
      abortController.abort();
    }
  }, [reservation_id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if(!reservationForm) return;
    setReservationForm({
      ...reservationForm,
      [e.target.name]: e.target.value,
    });
  }

  function validateReservation(e: FormEvent) {
    if(!reservationForm) return;
    e.preventDefault();
    setError(null);

    const [year, month, day] = reservationForm.reservation_date.split("-");
    const [hour, minutes] = reservationForm.reservation_time
      .split(":")
      .map((time) => Number(time));

    const reservationDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
    reservationDate.setHours(hour, minutes);
    const weekDay = reservationDate.getDay();
    const now = new Date();

    let errorString = "";

    if (reservationDate.getTime() < now.getTime()) {
      errorString += `Reservation must be in the future. `;
    }

    if (weekDay === 2) {
      errorString += `No reservations on Tuesdays as the restaurant is closed. `;
    }

    if ((hour === 10 && minutes < 30) || hour < 10) {
      errorString += `Restaurant opens at 10:30 AM. `;
    }

    if ((hour === 21 && minutes > 30) || hour > 21) {
      errorString += `Last reservation is at 9:30 PM. `;
    }

    if (reservationForm.status !== "booked") {
      errorString += `Reservation status must be "booked" to edit it. `;
    }

    errorString
      ? setError({ message: errorString })
      : submitEditedReservation();
  }

  async function submitEditedReservation() {
    if(!reservationForm) return;
    try {
      const response = await editReservation(reservationForm);
      navigate(`/dashboard?date=${response.reservation_date}`);
    } catch (error) {
      if(error instanceof Error) setError(error);
    }
  }


  if (reservationForm)
    return (
      <main>
        <h1>Edit Reservation</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Update the reservation</h4>
        </div>
        <ErrorAlert error={error} />
        <ReservationForm
          navigate={navigate}
          reservationForm={reservationForm}
          handleChange={handleChange}
          submitHandler={validateReservation}
        />
      </main>
    );

    return <h1>EditReservation</h1>

 
}
