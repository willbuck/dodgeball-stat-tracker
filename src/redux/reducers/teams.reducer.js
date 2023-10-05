const teamsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAMS':
      return action.payload;
    case 'REMOVE_TEAM':
      return [];
    default:
      return state;
  }
};
export default teamsReducer;