import React from "react";
import { connect } from "react-redux";
import {
  InputGroup,
  Card,
  Elevation,
  Divider,
  Colors,
  Button,
  FileInput
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Field, reduxForm } from "redux-form";
import {
  deselectEmployee,
  editEmployee,
  openModal,
  uploadFile
} from "../../actions";
import SalaryLogModal from "./SalaryLogModal";

class EmployeeEdit extends React.Component {
  state = { contract: null };
  onFileUploadChange = event => {
    this.setState({ contract: event.target.files[0] });
  };
  onUploadButtonClick = () => {
    uploadFile(this.state.contract, this.props.email);
  };
  onSubmit = formValues => {
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
            return str;
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
  renderUploadContract = () => {
    return (
      <div className="row mt-2">
        <div className="col-3"></div>
        <div className="col-5">
          <FileInput
            style={{ width: "10vw" }}
            text="Choose a Contract..."
            onInputChange={this.onFileUploadChange}
          />
        </div>
        <div className="col-2">
          <button
            className="btn-sm"
            onClick={this.onUploadButtonClick}
            style={{ border: "1px solid gray" }}
          >
            Upload
          </button>
        </div>
      </div>
    );
  };
  render() {
    return (
      <Card className="col-6" elevation={Elevation.TWO}>
        <SalaryLogModal></SalaryLogModal>
        <div className="row ml-2">
          <div className="col-5">
            <h5>{this.props.name}</h5>
          </div>
          <div className="col-5">
            <Button icon="dollar" onClick={this.props.openModal}>
              Insert Salary Log
            </Button>
          </div>
        </div>
        {this.renderUploadContract()}
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
            className="btn ml-2"
            onClick={this.props.deselectEmployee}
            style={{ border: "2px solid gray" }}
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
    name: state.selectedEmployee.name,
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
