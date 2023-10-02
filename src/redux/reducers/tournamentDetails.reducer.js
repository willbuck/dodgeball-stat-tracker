//The global store for storing the games 
// inside a specific tournament

const tournamentDetailsReducer = (state = [], action) => {
    switch(action.type){
        case 'TOURNAMENT_DETAILS':
            return action.payload;
        default:
            return state;
    }
};

export default tournamentDetailsReducer;