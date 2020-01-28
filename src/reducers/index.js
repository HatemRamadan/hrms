import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";
import modalReducer from "./modalReducer";
import salaryLogsReducer from "./salaryLogsReducer";
import employeesReducer from "./employeesReducer";
import selectEmployeeReducer from "./selectEmployeeReducer";

export default combineReducers({
  uid: authReducer,
  employee: employeeReducer,
  employees: employeesReducer,
  selectedEmployee: selectEmployeeReducer,
  isModalOpen: modalReducer,
  salaryLogs: salaryLogsReducer,
  form: formReducer
});
