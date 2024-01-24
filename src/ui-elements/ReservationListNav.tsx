import { previous, next, today } from "../utils/date-time";
import { useNavigate } from "react-router-dom";

export type ReservationListNavProps = {
  date: string,
  setDate: React.Dispatch<React.SetStateAction<string>>
}

function ReservationListNav({ date, setDate }: ReservationListNavProps) {
  const navigate = useNavigate();

  function incrementDate() {
    const nextDate = next(date);
    setDate(nextDate);
    navigate(`/dashboard?date=${nextDate}`);
  }

  function decrementDate() {
    const prevDate = previous(date);
    setDate(prevDate);
    navigate(`/dashboard?date=${prevDate}`);
  }

  function goToToday() {
    const todayDate = today();
    setDate(todayDate);
    navigate(`/dashboard?date=${todayDate}`);
  }

  const nav = (
    <div className="nav justify-content-between flex-nowrap">
      <div className="wrapper text-center">
        <span className="oi oi-arrow-left" />
        <button
          onClick={decrementDate}
          className="btn btn-link nav-link active d-inline"
        >
          Previous Day
        </button>
      </div>
      <div className="wrapper text-center">
        <span className="oi oi-timer" />
        <button
          onClick={goToToday}
          className="btn btn-link nav-link d-inline"
        >
          Today
        </button>
      </div>
      <div className="wrapper text-center">
        <button
          onClick={incrementDate}
          className="btn btn-link nav-link d-inline"
        >
          Next Day
        </button>
        <span className="oi oi-arrow-right" />
      </div>
    </div>
  );

  return nav;
}

export default ReservationListNav;
