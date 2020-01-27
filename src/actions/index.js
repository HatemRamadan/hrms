import history from "../history";
import { db, storage } from "../firebase";

export const login = (uid, email, name) => async dispatch => {
  await db
    .collection("hrms-employees")
    .doc(uid)
    .get()
    .then(res => {
      if (res.exists === false)
        db.collection("hrms-employees")
          .doc(uid)
          .set({
            email,
            name,
            isAdmin: false
          })
          .then(res => {
            history.push("/");
            dispatch({
              type: "LOGIN",
              payload: uid
            });
          });
      else {
        history.push("/");
        dispatch({
          type: "LOGIN",
          payload: uid
        });
      }
    });
};

export const logout = () => {
  history.push("/login");
  return {
    type: "LOGOUT"
  };
};

export const fetchEmployee = uid => async dispatch => {
  return db
    .collection("hrms-employees")
    .doc(uid)
    .onSnapshot(
      res => {
        dispatch({
          type: "FETCH_EMPLOYEE",
          payload: res.data()
        });
      },
      err => console.log(err)
    );
};

export const fetchSalaryLogs = () => async (dispatch, getState) => {
  const res = await db
    .collection("hrms-employees")
    .doc(getState().uid)
    .collection("salary log")
    .orderBy("timestamp", "desc")
    .get();

  const salarylogs = parseSalaryLogs(res.docs);
  dispatch({
    type: "FETCH_SALARY_LOGS",
    payload: salarylogs
  });
};

export const scheduleVacation = remainingVacationDays => async (
  disbatch,
  getState
) => {
  await db
    .collection("hrms-employees")
    .doc(getState().uid)
    .update({ remainingVacationDays: remainingVacationDays });
};

export const fetchAllEmployees = () => async dispatch => {
  return db.collection("hrms-employees").onSnapshot(res => {
    let employees = [];
    res.forEach(doc => {
      employees.push(doc.data());
    });
    dispatch({
      type: "FETCH_ALL_EMPLOYEES",
      payload: employees
    });
  });
};

export const selectEmployee = employee => {
  return {
    type: "SELECT_EMPLOYEE",
    payload: employee
  };
};

export const deselectEmployee = () => {
  return {
    type: "DESELECT_EMPLOYEE"
  };
};

export const editEmployee = (updatedEmployee, email) => async dispatch => {
  db.collection("hrms-employees")
    .where("email", "==", email)
    .limit(1)
    .get()
    .then(res => {
      res.docs[0].ref.update(updatedEmployee);
      dispatch(deselectEmployee());
    });
};

export const insertSalaryLog = salaryLog => async (dispatch, getState) => {
  await db
    .collection("hrms-employees")
    .where("email", "==", getState().selectedEmployee.email)
    .get()
    .then(res =>
      res.docs[0].ref.collection("salary log").add({
        gross: salaryLog.gross,
        taxes: salaryLog.taxes,
        transportation: salaryLog.transportation,
        notes: salaryLog.notes,
        timestamp: salaryLog.timestamp,
        month: salaryLog.month
      })
    );
  dispatch(closeModal());
};

export const uploadFile = (file, email) => {
  var ref = storage.ref(`hrms/contracts/${email}`);
  ref
    .put(file)
    .then(res => {})
    .catch(err => console.log(err));
};
export const getFileURL = email => {
  var ref = storage.ref();
  const doc = ref.child(`hrms/contracts/${email}`);
  return doc.getDownloadURL();
};
export const closeModal = () => {
  return {
    type: "CLOSE_MODAL"
  };
};

export const openModal = () => {
  return {
    type: "OPEN_MODAL"
  };
};
const parseSalaryLogs = docs => {
  let logs = [];
  docs.forEach(doc => {
    logs.push(doc.data());
  });
  return logs;
};
