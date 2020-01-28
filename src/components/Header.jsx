import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions";

import {
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from "@blueprintjs/core";
class Header extends React.Component {
  renderProfileOrCalendarIcon = () => {
    if (this.props.element === "profile")
      return (
        <Link to="/" style={{ color: "white" }}>
          <Button
            className={Classes.MINIMAL}
            icon="calendar"
            text="Calendar"
          ></Button>
        </Link>
      );
    else if (this.props.isAdmin)
      return (
        <Link to="/admin" style={{ color: "white" }}>
          <Button className={Classes.MINIMAL} icon="cog" text="Manage"></Button>
        </Link>
      );
    return (
      <Link to="/profile" style={{ color: "white" }}>
        <Button
          className={Classes.MINIMAL}
          icon="user"
          text="My Profile"
        ></Button>
      </Link>
    );
  };
  logout = () => {
    window.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(data => this.props.logout());
  };
  render() {
    if (this.props.isAdmin === undefined) return <div />;
    return (
      <Navbar style={{ backgroundColor: "#69c481" }}>
        <NavbarGroup align="left">
          <NavbarHeading
            style={{
              fontSize: "30px",
              fontFamily: "Comic Sans MS, cursive, sans-serif"
            }}
          >
            HRMS
          </NavbarHeading>
          <NavbarDivider />
        </NavbarGroup>
        <NavbarGroup align="right">
          {this.renderProfileOrCalendarIcon()}

          <Button
            className={Classes.MINIMAL}
            text="Sign Out"
            icon="log-out"
            onClick={this.logout}
          />
        </NavbarGroup>
      </Navbar>
    );
  }
}
const mapStateToProps = state => {
  return { isAdmin: state.employee.isAdmin };
};
export default connect(mapStateToProps, { logout })(Header);
