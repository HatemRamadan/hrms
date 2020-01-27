import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Dialog } from "@blueprintjs/core";
import { DateRangeInput } from "@blueprintjs/datetime";
import { closeModal, scheduleVacation } from "../../actions";

class Modal extends React.Component {
  formatDate = date => {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  };

  getNumOfDays = (start, end) => {
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };
  onSubmit = formValues => {
    let start = formValues.dates[0];
    let end = formValues.dates[1];
    let numOfDays = this.getNumOfDays(start, end);
    const day = 60 * 60 * 24 * 1000;

    if (this.props.remainingDays >= numOfDays) {
      this.sendEvent(
        this.props.name,
        this.formatDate(start),
        this.formatDate(new Date(end.getTime() + day))
      ).then(
        data => {
          this.props.scheduleVacation(this.props.remainingDays - numOfDays);
          this.props.closeModal();
        },
        err => console.log(err)
      );
    } else {
      alert("You only have " + this.props.remainingDays + " days left.");
    }
  };
  sendEvent = (name, start, end) => {
    var event = {
      summary: "Vacation ( " + name + " )",
      start: {
        date: start
      },
      end: {
        date: end
      }
    };
    return window.gapi.client.calendar.events.insert({
      calendarId: "b2075atruvv2hai75ah9lcr5m0@group.calendar.google.com",
      resource: event
    });
  };
  renderDateInput = formProps => {
    return (
      <div className="field">
        <DateRangeInput
          formatDate={date => this.formatDate(date)}
          parseDate={str => str}
          allowSingleDayRange={true}
          shortcuts={false}
          {...formProps.input}
        />
      </div>
    );
  };
  renderNumOfDays = () => {
    if (this.props.vacationDate && this.props.vacationDate[1] !== null) {
      return (
        <div className="mt-1 col-4">
          {this.getNumOfDays(
            this.props.vacationDate[0],
            this.props.vacationDate[1]
          )}{" "}
          Days
        </div>
      );
    }
  };
  render() {
    return (
      <Dialog
        canOutsideClickClose={false}
        canEscapeKeyClose={false}
        isOpen={this.props.isOpen}
        onClose={this.props.closeModal}
        title="Schedule A Vacation"
      >
        <div className="container mt-4 ml-3">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="row">
              <Field name="dates" component={this.renderDateInput}></Field>
              {this.renderNumOfDays()}
            </div>

            <button
              className="btn btn-md row mt-2"
              type="submit"
              style={{ backgroundColor: "#53c270" }}
            >
              Submit
            </button>
          </form>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.isModalOpen,
    name: state.employee.name,
    remainingDays: state.employee.remainingVacationDays,
    vacationDate: selector(state, "dates")
  };
};
const selector = formValueSelector("scheduleVacation");
export default connect(mapStateToProps, { closeModal, scheduleVacation })(
  reduxForm({
    form: "scheduleVacation"
  })(Modal)
);
