import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import Dashboard from "./components/dashboard.component";
import Table from "./components/table.component";
import axios from "axios";

function App({ history }) {
  const [healthCheck, setHealthCheck] = useState(false);

  const fetchHealthCheck = async () => {
    try {
      const statusHealthCheck = (
        await axios.get(`${process.env.REACT_APP_API_URL}health`, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
      ).data;
      setHealthCheck(statusHealthCheck.status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHealthCheck();
  }, []);

  return (
    <Router>
      <div className="App bg-secondary">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand" to={"/#"}>
              Nikei225.io
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/all"}>
                    ข้อมูลทั้งหมด
                  </Link>
                </li>

                {/* <li className="nav-item">
                <Link className="nav-link" to={"/table"}>ตาราง</Link>
              </li> */}
              </ul>
            </div>
            <span>
              Status:
              {healthCheck ? (
                <span style={{ color: "green" }}>เซิฟเวอร์ทำงานปกติ</span>
              ) : (
                <span style={{ color: "red" }}>เซิฟเวอร์เกิดข้อผิดพลาด</span>
              )}
            </span>
          </div>
        </nav>

        <div className="container pt-5">
          <div className="w-100">
            <Switch>
              <Route exact path="/" component={Dashboard}></Route>
              <Route exact path="/all" component={Table}></Route>
            </Switch>
          </div>
        </div>
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;
