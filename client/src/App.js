import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Login from "./components/login.component";
import Table from "./components/table.component";
import { removeLocalStorage } from './helpers/auth';
import { authenticate, isAuth ,setCookie ,removeCookie} from './helpers/auth';
function App({ history }) {
  return (<Router>
    <div className="App" onunload={removeLocalStorage("employee")}>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Nikei225.io</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>โหลดข้อมูล</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>สมัครสมาชิก</Link>
              </li> */}

              {/* <li className="nav-item">
                <Link className="nav-link" to={"/table"}>ตาราง</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner w-auto">
          <Switch>
            <Route exact path='/' component={Table}></Route>
            <Route path="/sign-in" component={Login} />
            
          </Switch>
        </div>
      </div>
      <NotificationContainer/>
    </div></Router>
  );
}

export default App;
