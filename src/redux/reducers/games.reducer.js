//The global store for storing the games 
// inside a specific tournament

const gamesReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_GAMES':
            return action.payload;
        default:
            return state;
    }
};

export default gamesReducer;