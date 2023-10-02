const tournamentReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TOURNAMENTS':
        return action.payload;
      case 'UNSET_TOURNAMENTS':
        return [];
      default:
        return state;
    }
  };
  export default tournamentReducer;