import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* addTeamToTournament(action) {
    let participants = action.team
    let newTournamentID = action.payload
    let sentObject = {participants, newTournamentID}

    try {
        const tournament = yield axios.post(`/api/challonge/tournament/participants`, sentObject);

    } catch (error) {
        console.log('get all error', error);
    }
}

function* addTeamTounament() {
    yield takeLatest('TEAM_TO_TOURNAMENT', addTeamToTournament);
}

export default addTeamTounament;