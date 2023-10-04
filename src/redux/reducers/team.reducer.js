const teamReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAM':
      return action.payload;
    case 'REMOVE_TEAM':
      return [];
    default:
      return state;
  }
};
export default teamReducer;