import React from "react";
import { connect } from "react-redux";
import { H4, H6 } from "@blueprintjs/core";
import { getFileURL } from "../../actions";

class Info extends React.Component {
  state = { url: "" };
  componentDidMount() {
    getFileURL(this.props.employee.email)
      .then(url => this.setState({ url }))
      .catch(err => console.log(err));
  }
  formatDate = date => {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  };
  renderStartDate = () => {
    if (this.props.employee.startDate)
      return (
        <H6>
          {this.formatDate(
            new Date(this.props.employee.startDate.seconds * 1000)
          )}
        </H6>
      );
    else return <H6>No Data</H6>;
  };

  renderEndDate = () => {
    if (this.props.employee.endDate)
      return (
        <H6>
          {this.formatDate(
            new Date(this.props.employee.endDate.seconds * 1000)
          )}
        </H6>
      );
    else return <H6>No Data</H6>;
  };

  render() {
    return (
      <div className="container-fluid ml-5">
        <div className="row no-gutters">
          <div className="col-5">
            <H4>Start Date: </H4>
          </div>
          <div className="col-3 mt-1">{this.renderStartDate()}</div>
        </div>
        <div className="row no-gutters">
          <div className="col-5">
            <H4>End Date:</H4>
          </div>
          <div className="col-3 mt-1">{this.renderEndDate()}</div>
        </div>
        <div className="row no-gutters">
          <div className="col-5">
            <H4>Salary:</H4>
          </div>
          <div className="col-3 mt-1">
            <H6>
              {this.props.employee.salary === undefined
                ? "No Data"
                : this.props.employee.salary}
            </H6>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-6">
            <H4>Remaining Vacation Days:</H4>
          </div>
          <div className="col-3 mt-1">
            <H6>
              {this.props.employee.remainingVacationDays === undefined
                ? "No Data"
                : this.props.employee.remainingVacationDays}
            </H6>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-6">
            <H4>Total Vacation Days:</H4>
          </div>
          <div className="col-3 mt-1">
            <H6>
              {this.props.employee.totalVacationDays === undefined
                ? "No Data"
                : this.props.employee.totalVacationDays}
            </H6>
          </div>
        </div>
        <a
          hidden={this.state.url === ""}
          className="row"
          href={this.state.url ? this.state.url : ""}
        >
          Contract
        </a>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { employee: state.employee };
};
export default connect(mapStateToProps)(Info);
