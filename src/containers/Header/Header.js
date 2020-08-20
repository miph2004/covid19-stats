import React from "react";
import DashBoard from "../DashBoard/Dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <Router>
        <div className="header">
          <nav className="header__nav">
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/map">Map</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <DashBoard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Header;
