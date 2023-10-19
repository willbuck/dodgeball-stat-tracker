const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "UNSET_USER":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
