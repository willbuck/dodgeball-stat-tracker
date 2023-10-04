import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


function* createTeam(action) {

  console.log(`In *createTeam, new team: ${ action.payload }`)
  
    const { teamName } = action.payload

    try {
    
        const queryData = { newTeam }
        // POST team to DB
        yield axios.post('/api/tournament/participant', queryData)
    } catch (error) {
        console.error(`Cannot create team. ${error}`)
    }
}

function* tournamentSaga() {  
    yield takeLatest('CREATE_TEAM', createTeam)
}

export default tournamentSaga;