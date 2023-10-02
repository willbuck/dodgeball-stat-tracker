import { takeEvery, put } from 'redux-saga/effects';
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

function* tournamentSaga() {  
    yield takeEvery('FETCH_TOURNAMENTS', fetchTournaments);
}

export default tournamentSaga;