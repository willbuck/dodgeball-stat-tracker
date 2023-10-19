const teamModal = (state = [], action) => {
  switch (action.type) {
    case "SET_MODAL":
      return action.payload;
    default:
      return state;
  }
};

export default teamModal;
