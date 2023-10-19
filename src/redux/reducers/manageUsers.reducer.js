const manageUsersReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default manageUsersReducer;