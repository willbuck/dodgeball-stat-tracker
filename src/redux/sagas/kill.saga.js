import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


function* storeKills() {
    try {
        console.log("in fetch decks")
        
        // yield put({ 
        //     type: 'SET_DECKS', 
        //     payload: decks.data
        // });

    } catch (error){
        console.log('get all error', error);
    }
        
}

function* killSaga() {  
    yield takeEvery('STORE_KILL', storeKills);
}

export default killSaga;