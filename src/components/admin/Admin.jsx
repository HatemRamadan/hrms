import React from "react";
import { connect } from "react-redux";
import { reset } from "redux-form";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { fetchAllEmployees, selectEmployee } from "../../actions";
import Header from "../Header";
import EmployeeEdit from "./EmployeeEdit";
import "./Admin.css";

class Admin extends React.Component {
  state = { sideMenuWidth: "0px", mainMargin: "0px" };
  componentDidMount() {
    this.props.fetchAllEmployees();
  }
  openSideMenu = () => {
    this.setState({ sideMenuWidth: "250px", mainMargin: "250px" });
  };

  closeSideMenu = () => {
    this.setState({ sideMenuWidth: "0px", mainMargin: "0px" });
  };
  renderEmployeeEdit = () => {
    if (this.props.selectedEmployee !== null)
      return <EmployeeEdit></EmployeeEdit>;
  };
  render() {
    return (
      <div>
        <div className="sidenav" style={{ width: this.state.sideMenuWidth }}>
          <span className="closebtn" onClick={this.closeSideMenu}>
            x
          </span>
          {this.props.employees.map(employee => {
            return (
              <span
                key={employee.email}
                onClick={() => {
                  reset("editEmployee");
                  this.props.selectEmployee(employee);
                }}
              >
                {employee.email.split("@")[0]}
              </span>
            );
          })}
        </div>
        <div className="main" style={{ marginLeft: this.state.mainMargin }}>
          <Header element="profile"></Header>

          <div className="container mt-2">
            <div className="row mt-2">
              <div className="col-3"></div>
              <Card className="col-4" elevation={Elevation.TWO}>
                <h3>
                  <div>Dashboard</div>
                </h3>
                <p>Number of Employees: {this.props.employees.length}</p>
                <Button onClick={this.openSideMenu}>Show Employees</Button>
              </Card>
            </div>

            <div className="row mt-3">
              <div className="col-2"></div>
              {this.renderEmployeeEdit()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    employees: state.employees,
    selectedEmployee: state.selectedEmployee
  };
};
export default connect(mapStateToProps, { fetchAllEmployees, selectEmployee })(
  Admin
);
