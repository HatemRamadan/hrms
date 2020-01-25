import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Dialog, InputGroup } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { closeModal, insertSalaryLog } from "../../actions";

class SalaryLogModal extends React.Component {
  onSubmit = formValues => {
    this.props.insertSalaryLog(formValues).then(() => this.props.reset());
  };
  formatDate = date => {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  };
  renderTextInput = formProps => {
    return (
      <label className="bp3-label">
        {formProps.label}
        <InputGroup {...formProps.input} />
      </label>
    );
  };
  renderDateInput = formProps => {
    return (
      <label className="bp3-label">
        {formProps.label}
        <DateInput
          formatDate={date => this.formatDate(date)}
          parseDate={str => str}
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
      <Dialog
        canOutsideClickClose={false}
        canEscapeKeyClose={false}
        isOpen={this.props.isOpen}
        onClose={this.props.closeModal}
        title="Insert Salary Log"
      >
        <div className="container mt-3">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              name="gross"
              component={this.renderTextInput}
              label="Gross"
              parse={v => Number(v)}
            ></Field>
            <Field
              name="transportation"
              component={this.renderTextInput}
              label="Transportation"
              parse={v => Number(v)}
            ></Field>
            <Field
              name="taxes"
              component={this.renderTextInput}
              label="Taxes"
              parse={v => Number(v)}
            ></Field>
            <Field
              name="notes"
              component={this.renderTextInput}
              label="Notes"
            ></Field>
            <Field
              name="timestamp"
              component={this.renderDateInput}
              label="Pay Date"
            ></Field>
            <label className="bp3-label row">
              <span className="col-3 ml-1">Month</span>
              <Field name="month" component="select" className="col-3">
                <option></option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </Field>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.isModalOpen,
    initialValues: {
      timestamp: new Date(Date.now())
    }
  };
};
export default connect(mapStateToProps, { closeModal, insertSalaryLog })(
  reduxForm({
    form: "salaryLog"
  })(SalaryLogModal)
);
