export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_SALARY_LOGS": {
      return action.payload;
    }
    default:
      return state;
  }
};
