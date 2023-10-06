import { takeLatest, put} from "redux-saga/effects";
import axios from 'axios';

function* searchTeamLeaderboard(action){
    const tournamentId = action.payload.tournament_id;
    const teamId = action.payload.id;
    console.log('asiya:', tournamentId, teamId);

    // This variable will store the results 
    // from the axios GET, 
    // all teams from a given tournament 
    const searchTeam = yield axios.get(`/api/searchTeam/${tournamentId}/${teamId}`);
    
    //Storing the data in a store
    yield put({
        type: 'SEARCH_TEAM',
        payload: searchTeam.data
    })
}

function* searchTeamLeaderboardSaga(){
    yield takeLatest('SEARCH_TEAM_STAT', searchTeamLeaderboard)
}

export  default searchTeamLeaderboardSaga;