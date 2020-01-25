import React from "react";
import { connect } from "react-redux";
import {
  InputGroup,
  Card,
  Elevation,
  Divider,
  Colors
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Field, reduxForm } from "redux-form";
import { deselectEmployee, editEmployee, openModal } from "../../actions";
import SalaryLogModal from "./SalaryLogModal";

class EmployeeEdit extends React.Component {
  onSubmit = formValues => {
    console.log(formValues);
    this.props.editEmployee(formValues, this.props.email);
  };
  formatDate = date => {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  };
  renderTextInput = formProps => {
    return (
      <div>
        <label className="bp3-label">
          {formProps.label}
          <InputGroup {...formProps.input} />
        </label>
        {this.renderError(formProps.meta)}
      </div>
    );
  };
  renderError({ error, touched }) {
    if (touched && error)
      return <span style={{ color: Colors.RED3 }}>{error}</span>;
  }
  renderDateInput = formProps => {
    return (
      <label className="bp3-label">
        {formProps.label}
        <DateInput
          formatDate={date => this.formatDate(date)}
          parseDate={str => {
            console.log(str.l);
            return str || Date.now();
          }}
          maxDate={new Date(2025, 12, 31)}
          {...formProps.input}
          popoverProps={{
            onOpened: e => {
              const el = document.querySelector('.DayPicker-Day[tabindex="0"]');
              el.addEventListener("blur", e => {
                e.stopImmediatePropagation();
              });
            }
          }}
        />
      </label>
    );
  };
  render() {
    return (
      <Card className="col-6" elevation={Elevation.TWO}>
        <SalaryLogModal></SalaryLogModal>
        <div className="row ml-2">
          <div className="col-4">
            <h5>{this.props.email.split("@")[0]}</h5>
          </div>
          <div className="col-5">
            <button onClick={this.props.openModal}>Insert Salary Log</button>
          </div>
        </div>
        <Divider className="mt-3" />
        <h5 className="mt-3">Edit Employee</h5>
        <form
          className="mt-3"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="name"
            component={this.renderTextInput}
            label="Name"
          ></Field>
          <Field
            name="title"
            component={this.renderTextInput}
            label="Title"
          ></Field>
          <Field
            name="salary"
            component={this.renderTextInput}
            label="Salary"
            parse={v => Number(v)}
          ></Field>
          <Field
            name="startDate"
            component={this.renderDateInput}
            label="Start Date"
          ></Field>
          <Field
            name="endDate"
            component={this.renderDateInput}
            label="End Date"
          ></Field>
          <Field
            name="totalVacationDays"
            component={this.renderTextInput}
            label="Total Vacation Days"
            parse={v => Number(v)}
          ></Field>
          <Field
            name="remainingVacationDays"
            component={this.renderTextInput}
            label="Remaining Vacation Days"
            parse={v => Number(v)}
          ></Field>
          <button
            className="btn"
            type="submit"
            style={{ backgroundColor: "#53c270", color: "#111" }}
          >
            Submit
          </button>
          <button
            className="btn bg-secondary ml-2"
            onClick={this.props.deselectEmployee}
          >
            Cancel
          </button>
        </form>
      </Card>
    );
  }
}
const mapStateToProps = state => {
  return {
    email: state.selectedEmployee.email,
    initialValues: {
      title: state.selectedEmployee.title,
      name: state.selectedEmployee.name,
      salary: state.selectedEmployee.salary,
      totalVacationDays: state.selectedEmployee.totalVacationDays,
      remainingVacationDays: state.selectedEmployee.remainingVacationDays,
      startDate: state.selectedEmployee.startDate
        ? new Date(state.selectedEmployee.startDate.seconds * 1000)
        : new Date(2000, 1, 1),
      endDate: state.selectedEmployee.endDate
        ? new Date(state.selectedEmployee.endDate.seconds * 1000)
        : new Date(2000, 1, 1)
    }
  };
};
const validate = formValues => {
  let errors = {};

  if (!formValues.max_number_of_users)
    errors.max_number_of_users = "Max. number of users is required";
  if (!formValues.order) errors.order = "Order is required";
  if (!formValues.text) errors.text = "Text is required";
  if (!formValues.date) errors.date = "Date is required";

  return errors;
};

export default connect(mapStateToProps, {
  deselectEmployee,
  editEmployee,
  openModal
})(
  reduxForm({
    form: "editEmployee",
    enableReinitialize: true
  })(EmployeeEdit)
);
