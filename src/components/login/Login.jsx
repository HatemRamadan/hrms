import React from "react";
import { Spinner } from "@blueprintjs/core";
import { connect } from "react-redux";
import { login, logout, fetchEmployee } from "../../actions";
import quotes from "../../Quotes";
import "./Login.css";

class Login extends React.Component {
  state = { quote: quotes[Math.floor(Math.random() * quotes.length)] };

  componentDidMount() {
    window.gapi.load("client:auth2", () =>
      window.gapi.client
        .init({
          clientId:
            "342068308292-cplrfsg7qkfk022hql2rp6ujvm2eilp4.apps.googleusercontent.com",
          scope:
            "email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
          ],
          apiKey: "AIzaSyA4aO4Ga-yRkr1PHcB4wc4otZaR_XtbzkY"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        })
    );
  }
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      if (
        this.auth.currentUser
          .get()
          .getBasicProfile()
          .getEmail()
          .split("@")[1] === "gmail.com"
      ) {
        this.props.login(
          this.auth.currentUser.get().getId(),
          this.auth.currentUser
            .get()
            .getBasicProfile()
            .getEmail()
        );
        this.props.fetchEmployee(this.auth.currentUser.get().getId());
      } else {
        this.auth.signOut();
        alert("Unauthorized");
      }
    } else this.props.logout();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };
  renderSpinner = () => {
    if (this.props.isLoggedIn) {
      return <Spinner intent="success" size="70" />;
    } else {
      if (window.gapi.auth2) {
        return (
          <button
            className="btn"
            style={{
              color: "white",
              borderRadius: "20px",
              backgroundColor: "#69c481"
            }}
            onClick={this.onSignInClick}
          >
            Login with google
          </button>
        );
      } else return <Spinner intent="success" size="70" />;
    }
  };
  render() {
    return (
      <div className="container text-center">
        <div className="container col-4" style={{ paddingTop: "20%" }}>
          <div className="row mb-5">
            <div className="col-1"></div>
            <div className="col-4">
              <h1 className="bp3-heading title" style={{ fontSize: "90px" }}>
                HRMS
              </h1>
            </div>
          </div>
          {this.renderSpinner()}
          <div
            className="row mt-4 .bp3-ui-text text-center"
            style={{ fontSize: "20px" }}
          >
            <q className="col">{this.state.quote}</q>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { isLoggedIn: state.uid !== "" };
};
export default connect(mapStateToProps, { login, logout, fetchEmployee })(
  Login
);
