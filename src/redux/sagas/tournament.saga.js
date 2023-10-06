import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTournaments() {
    try {
        const tournaments = yield axios.get('/api/tournament');
        
        yield put({ 
            type: 'SET_TOURNAMENTS', 
            payload: tournaments.data
        });

    } catch (error){
        console.log('get all error', error);
    }
}

function* createTournament(action) {
    // X - post tournament to Challonge
    // X - post tournament to database
    //? Should the next two be in their own saga action?
    // 3 - post participants to database
    // 4 - post participants to Challonge
    
    console.log('in createTournament', action.payload)

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

        const newTournamentID = newTournamentData.data.url;

        const queryData = {
            name,
            organizer: user.id,
            location,
            startDate,
            ballType,
            courts, 
            description,
            url: newTournamentID
        };

        // Post tournament data to database
        const newTournamentQuery = yield axios.post('/api/tournament', queryData)
        console.log('response from tournament query:', newTournamentQuery)

        // Function to add tournament ID to participants list
        const addTournamentID = (array, url) => {
            for (let index of array) {
                index.tournamentURL = url;
            }
        }
        yield addTournamentID(participants, newTournamentID);

        // Post participants to database
        yield axios.post('/api/tournament/participants', participants);
        
        // Send participants to Challonge
        yield axios.post('/api/challonge//tournament/participants', {participants, newTournamentID});


    } catch (error) {
        console.log('error in create tournament saga:', error)
    }
}

function* tournamentSaga() {  
    //? Why takeEvery over takeLatest for FETCH_TOURNAMENTS?
    yield takeEvery('FETCH_TOURNAMENTS', fetchTournaments);
    yield takeLatest('CREATE_TOURNAMENT', createTournament)
}

export default tournamentSaga;