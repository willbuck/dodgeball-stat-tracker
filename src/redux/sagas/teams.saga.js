import { takeLatest, takeEvery, put } from 'redux-saga/effects';
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
  console.log(`In *addTeam, new team:`, action.payload)

  // const {
  //   teamName
  // } = action.payload

  // const newTeamData = {
  //   teamName
  // }

  console.log("new team data", action.payload)
  try {
    const newTeamQuery = yield axios.post('/api/teams', action.payload)
    //console.log('Connecting to server...')
    //console.log(`Response: ${(newTeamQuery)}`)
  } catch (error) {
    console.error(`Cannot connect to server. ${error}`)
  }
}

function* deleteTeam(action) {
  console.log(`In *deleteTeam, Team ID: ${action.payload}`)

  const id = action.payload

  try {
    console.log(`ID: ${id}`)
    yield axios.delete(`/api/teams/${id}`)
    console.log(`Connecting to server...`)
    console.log(`Team removed from DB.`)

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