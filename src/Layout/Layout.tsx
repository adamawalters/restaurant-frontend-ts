import Menu from "./Menu";
import AppRoutes from "./Routes";
import "./Layout.css";


function Layout() {
  return (
    <div className="container-fluid" style={{height: "100%"}}>
      <div id="main-row" className="row">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
