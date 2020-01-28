import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import Calendar from "./calendar/Calendar";
import history from "../history";
import { login, logout } from "../actions";
import Profile from "./profile/Profile";
import Login from "./login/Login";
import Admin from "./admin/Admin";

class App extends React.Component {
  constructor(props) {
    super(props);
    if (props.uid === "") {
      history.push("login");
    }
  }

  renderProfileRoute = () => {
    if (this.props.isAdmin)
      return <Route path="/admin" exact component={Admin}></Route>;
    else return <Route path="/profile" exact component={Profile}></Route>;
  };
  render() {
    return (
      <div
        className="container-fluid"
        style={{ height: "100vh", backgroundColor: "#eeeeee" }}
      >
        <Router history={history}>
          <Switch>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/" exact component={Calendar}></Route>
            {this.renderProfileRoute()}
          </Switch>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { uid: state.uid, isAdmin: state.employee.isAdmin };
};
export default connect(mapStateToProps, { login, logout })(App);
