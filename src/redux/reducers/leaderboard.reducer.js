const leaderboardReducer = (state =[], action) => {
    switch(action.type){
        case 'LEADERBOARD_DATA':
            return action.payload
        default:
            return state;
    }
}

export default leaderboardReducer;