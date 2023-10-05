const teamsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAM_LIST':
      return action.payload;
    
    default:
      return state;
  }
};
export default teamsReducer;