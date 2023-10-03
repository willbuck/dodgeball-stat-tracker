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
    // 1 - post tournament to Challonge
    // 2 - get tournament from Challonge?
    // 3 - post tournament to database
    //? Should the next two be in their own saga action?
    // 4 - post participants to Challonge
    // 5 - post participants to database
    console.log('in createTournament', action.payload)

    try {

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