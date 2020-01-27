import React from "react";
import { connect } from "react-redux";
import "./SalaryLog.css";
class SalaryLog extends React.Component {
  renderSalaryLog = () => {
    if (this.props.logs.length === 0) return <h4>No Salary Logs</h4>;
    else
      return (
        <table className="w-100">
          <thead>
            <tr>
              <th>Month</th>
              <th>Gross</th>
              <th>Taxes</th>
              <th>Transportation</th>
              <th>Net</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {this.props.logs.map(log => {
              return (
                <tr key={log.timestamp.seconds}>
                  <td>{log.month}</td>
                  <td>{log.gross}</td>
                  <td>{log.taxes}</td>
                  <td>{log.transportation}</td>
                  <td>{log.gross - log.taxes + log.transportation}</td>
                  <td>{log.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
  };
  render() {
    return this.renderSalaryLog();
  }
}
const mapStateToProps = state => {
  return { logs: state.salaryLogs };
};
export default connect(mapStateToProps)(SalaryLog);
