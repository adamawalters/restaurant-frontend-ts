import { ChangeEvent, FormEvent, useState } from "react";
import ErrorAlert from "../Layout/ErrorAlert";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const [newReservationError, setNewReservationError] = useState<{message: string} | null>(null);
  const navigate = useNavigate();

  const defaultReservationForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [reservationForm, setReservationForm] = useState(
    defaultReservationForm
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setReservationForm({
      ...reservationForm,
      [event.target.name]: event.target.value,
    });
  }

  function validateReservation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewReservationError(null);

    const [year, month, day] = reservationForm.reservation_date.split("-");
    const [hour, minutes] = reservationForm.reservation_time
      .split(":")
      .map((time) => Number(time));

    const reservationDate = new Date(Number(year), Number(month) - 1, Number(day));
    reservationDate.setHours(hour, minutes);
    const weekDay = reservationDate.getDay();
    const now = new Date();

    let errorString = "";

    if (reservationDate.getTime() < now.getTime()) {
      errorString += `Reservation must be in the future.`;
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

    errorString
      ? setNewReservationError({ message: errorString })
      : submitNewReservation();
  }

  async function submitNewReservation() {
    try {
      const response = await createReservation(reservationForm);
      setReservationForm({ ...defaultReservationForm });
      navigate(`/dashboard?date=${response.reservation_date}`);
    } catch (error) {
      if(error instanceof Error) setNewReservationError(error);
    }
  }

  return (
    <main style={{ height: "100%", overflow: "hidden" }}>
      <h1>New Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Create a new reservation</h4>
      </div>
      <ErrorAlert error={newReservationError} />
      <ReservationForm
        navigate={navigate}
        reservationForm={reservationForm}
        handleChange={handleChange}
        submitHandler={validateReservation}
      />
    </main>
  );
}

export default NewReservation;
