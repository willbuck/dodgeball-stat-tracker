const selectedTournamentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELECTED_TOURNAMENT':
            return action.payload;
        case 'UNSET_SELECTED_TOURNAMENT':
            return [];
        default:
            return state;
    }
};
export default selectedTournamentReducer;