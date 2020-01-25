import React from "react";
import { connect } from "react-redux";
import { Icon, Tab, Tabs } from "@blueprintjs/core";
import { fetchSalaryLogs } from "../../actions";
import Header from "../Header";
import Info from "./Info";
import SalaryLog from "./SalaryLog";

class Profile extends React.Component {
  state = { navbarTabId: "profileInfo" };
  componentDidMount() {
    this.props.fetchSalaryLogs();
  }
  handleTabChange = navbarTabId => this.setState({ navbarTabId });
  render() {
    return (
      <div>
        <Header element="profile"></Header>
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-5"></div>
            <div className="col-1">
              <Icon className="mt-3" icon="user" iconSize={70} />
            </div>
            <div className="col-4">
              <h1>{this.props.employee.name}</h1>
              <h5 style={{ color: "#2B95D6" }}>{this.props.employee.title}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-5"></div>
            <div className="col-3 mt-5">
              <Tabs
                id="profile"
                onChange={this.handleTabChange}
                selectedTabId={this.state.navbarTabId}
              >
                <Tab id="profileInfo" title="Info" panel={<Info />} />
                <Tab
                  id="salaryLog"
                  title="Salary Log"
                  panel={<SalaryLog />}
                  panelClassName="ember-panel"
                />
                <Tabs.Expander />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { employee: state.employee };
};
export default connect(mapStateToProps, { fetchSalaryLogs })(Profile);
