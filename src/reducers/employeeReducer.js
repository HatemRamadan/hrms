export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_EMPLOYEE": {
      return { ...action.payload };
    }
    default:
      return state;
  }
};
