import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Get all tournaments from database
function* fetchTournaments() {
    try {
        // Get tournaments from database
        const tournaments = yield axios.get('/api/tournament');

        // Update tournaments reducer
        yield put({
            type: 'SET_TOURNAMENTS',
            payload: tournaments.data
        });

    } catch (error) {
        console.log('get all error', error);
    }
}

// Create new tournament and participants in Challonge and database
function* createTournament(action) {

    const {
        name,
        startDate,
        ballType,
        location,
        courts,
        description,
        user,
        participants } = action.payload

    try {
        // Create tournament on Challonge
        const newTournamentData = yield axios.post('/api/challonge/tournament', action.payload);

        const newTournamentURL = newTournamentData.data.url;
        console.log('new tournament url:', newTournamentURL)
        const queryData = {
            name,
            organizer: user.id,
            location,
            startDate,
            ballType,
            courts,
            description,
            url: newTournamentURL
        };

        // Post tournament data to database
        const newTournamentQuery = yield axios.post('/api/tournament', queryData)

        // Add tournament ID to participants list
        const addTournamentID = (array, url) => {
            for (let index of array) {
                index.tournamentURL = url;
            }
        }
        if (participants.length !== 0) {
            yield addTournamentID(participants, newTournamentURL);

        
        // Post participants to database
        yield axios.post('/api/tournament/participants', participants);

        // Send participants to Challonge
        yield axios.post('/api/challonge/tournament/participants', { participants, newTournamentURL });
        }
        

    } catch (error) {
        console.log('error in create tournament saga:', error)
    }
}

// Edit tournament in database
function* editTournament(action) {
    try {
        // edit tournament in database
        const tournaments = yield axios.put('/api/tournament', action.payload);

        // Update tournaments reducer
        yield put({
            type: 'FETCH_TOURNAMENTS',
        });

    } catch (error) {
        console.log('get all error', error);
    }
}

function* tournamentSaga() {
    yield takeLatest('FETCH_TOURNAMENTS', fetchTournaments);
    yield takeLatest('CREATE_TOURNAMENT', createTournament);
    yield takeLatest('EDIT_TOURNAMENT', editTournament)

}

export default tournamentSaga;