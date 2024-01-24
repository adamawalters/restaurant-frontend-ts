import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../table/NewTable";
import SeatReservation from "../reservations/SeatReservation";
import SearchReservation from "../reservations/SearchReservation";
import EditReservation from "../reservations/EditReservation";

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />}></Route>
      <Route path="/reservations" element={<Navigate to="/dashboard" />}></Route>
      <Route path="/dashboard/*" element={<Dashboard />}>
      </Route>
      <Route path="/reservations/new" element={<NewReservation />}></Route>
      <Route path="/tables/new" element={<NewTable />}></Route>
      <Route
        path="/reservations/:reservation_id/seat"
        element={<SeatReservation />}
      ></Route>
      <Route path="/search" element={<SearchReservation />}></Route>
      <Route
        path="/reservations/:reservation_id/edit"
        element={<EditReservation />}
      ></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default AppRoutes;
