import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


function* fetchTournaments() {
    try {
        console.log("in GET tourny")
        const tournaments = yield axios.get('/api/tournament');
        console.log('get all:', tournaments.data);
        
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
    // 2 - post tournament to database
    //? Should the next two be in their own saga action?
    // 3 - post participants to Challonge
    // 4 - post participants to database
    console.log('in createTournament', action.payload)

    const {name, startDate, ballType, location, courts, description, user} = action.payload

    try {
        // Create tournament on Challonge
        const newTournamentData = yield axios.post('/api/challonge/tournament', action.payload);
        console.log('data from Challonge create:', newTournamentData);

        const queryData = {
            name,
            organizer: user.id,
            location,
            startDate,
            ballType,
            courts, 
            description,
            url: newTournamentData.data.url 
        }
        // Post tournament data to database
        yield axios.post('/api/tournament', queryData)
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