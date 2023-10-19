const statTrackingReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_STATS":
      return action.payload;
    default:
      return state;
  }
};

export default statTrackingReducer;
