export default (state = null, action) => {
  switch (action.type) {
    case "SELECT_EMPLOYEE": {
      return action.payload;
    }
    case "DESELECT_EMPLOYEE": {
      return null;
    }
    default:
      return state;
  }
};
