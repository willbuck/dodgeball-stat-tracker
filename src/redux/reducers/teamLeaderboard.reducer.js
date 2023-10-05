const teamLeaderboard = (state = [], action) => {
    switch(action.type){
        case 'ALL_TEAMS':
            return action.payload;
        default:
            return state;
    }
}

export default teamLeaderboard