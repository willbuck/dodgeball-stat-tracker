const statsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STATS':
      return action.payload;

    default:
      return state;
  }
};

export default statsReducer;