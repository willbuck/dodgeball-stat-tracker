const searchTeamLeaderboard = (state = [], action) => {
    switch(action.type){
        case 'SEARCH_TEAM':
            return action.payload
        default:
            return state;
    }
}

export default searchTeamLeaderboard;