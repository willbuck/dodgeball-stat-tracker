import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

// Getting all teams from the DB
function* fetchTeams() {
  try {
    const teams = yield axios.get('api/teams')

    // Teams reducer will update the full list of teams in the DB
    yield put({
      type: 'SET_TEAMS',
      payload: teams.data
    })
    
  } catch (error) {
    console.error(`Cannot get teams, ${error}`)
  }
}

// * This function only adds team into DB, and will not update a Challonge tournament
function* addTeam(action) {
  try {
    const newTeamQuery = yield axios.post('/api/teams', action.payload)
  } catch (error) {
    console.error(`Cannot connect to server. ${error}`)
  }
}

function* deleteTeam(action) {
  const id = action.payload
  try {
    yield axios.delete(`/api/teams/${id}`)
  } catch (error) {
    console.error(`Cannot connect to server. ${error}`)
  }
}

function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeams)
  yield takeLatest('ADD_TEAM', addTeam)
  yield takeLatest('DELETE_TEAM', deleteTeam)
}

export default teamsSaga;