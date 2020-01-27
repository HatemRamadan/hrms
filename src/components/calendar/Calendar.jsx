import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions";
import Header from "../Header";
import "./Calendar.css";
import Modal from "./Modal";

class Calendar extends React.Component {
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  renderScheduleEvent = () => {};
  render() {
    return (
      <div>
        <Header element="calendar"></Header>
        <Modal></Modal>
        <div>
          <iframe
            key={this.props.remainingDays}
            title="googleCalendar"
            src="https://calendar.google.com/calendar/embed?src=b2075atruvv2hai75ah9lcr5m0%40group.calendar.google.com"
            className="calendar"
            frameBorder="0"
            scrolling="no"
            onLoad={this.renderScheduleEvent}
          ></iframe>
          <button
            className="btn ml-2"
            onClick={() => this.props.openModal()}
            style={{ backgroundColor: "#53c270", color: "#111" }}
            hidden={this.props.employee.isAdmin || !this.props.employee.name}
          >
            Schedule Vacation
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    remainingDays: state.employee.remainingVacationDays,
    employee: state.employee
  };
};
export default connect(mapStateToProps, { openModal })(Calendar);
