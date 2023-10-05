import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTeams() {
  try {
    console.log(`Getting all teams`)
    const teams = yield axios.get('api/teams')

    yield put({
      type: 'SET_TEAM_LIST',
      payload: teams.data
    })
  } catch (error) {
    (`Cannot get teams, ${error}`)
  }
}

function* addTeam(action) {
// * This function only adds team into DB, and will not update a Challonge tournament
  console.log(action.payload)
  
  const {
    teamName
  } = action.payload

  const newTeamData = {
    teamName
  }

  try {
    const newTeamQuery = yield axios.post('/api/teams', newTeamData)
    console.log('Connecting to server...')
    console.log(`Response: ${(newTeamQuery)}`)
    } catch (error) {
        console.error(`Cannot connect to server.  Try again later. ${error}`)
    }
  }

  function* deleteTeam() {
    console.log(`In *deleteTeam`)
  }

function* teamsSaga() {  
    yield takeLatest('ADD_TEAM', addTeam)
    yield takeLatest('FETCH_TEAM_LIST', fetchTeams)
    yield takeLatest('DELETE_TEAM', deleteTeam)
}

export default teamsSaga;