const playersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLAYERS':
            return action.payload;
        // setting the list of every player in the DB
        case 'SET_ALL_PLAYERS':
            return action.payload;
        case 'UNSET_PLAYERS':
            return [];
        default:
            return state;
    }
};
export default playersReducer;