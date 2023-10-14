import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchStats(action) {
  try {
    const statsResponse = yield axios.get('api/stats')

    yield put({type: 'SET_STATS', payload: statsResponse.data});

  } catch (error) {
    console.log('error in fetchStats:', error)
  }
}

function* sendStats(action) {
  try {
    console.log('in send stats:', action.payload);


  // Post user stat session to the database
    axios.put('api/stats', action.payload)

  } catch (error) {
    console.log('error in sendStats:', error)
  }
  
}

function* initializeTracking(action) {
  try {
    const {user, stats} = action.payload;
    console.log('action. payload:', action.payload);


    let userSession = [];
    stats.map( session => {
      if( session.user_id !== user.id) {
        return 
      };

      // Add game to userSession if not already present
      if (!userSession.includes(session.game_id)) {
        userSession.push( {
          game: session.game_id,
          teams: [],
          official: session.is_official
        })
      }

      // Get index of current game in userSession array
      const gameIndex = userSession.findIndex((game) => game.game === session.game_id );

      // Find index of current team in game object
      const teamIndex = userSession[gameIndex].teams.findIndex((team) => team.id === session.team_id)

      // Add team to game if not already present
      if (userSession[gameIndex].teams.findIndex((team) => team.id === session.team_id)=== -1) {
        userSession[gameIndex].teams.push({
          team: session.team_id,
          players: []
        })
      }

      // Create player object
      const sessionPlayer = {
        id: session.id, // The id in the database
        player: session.player_id,
        stats: {
          kills: session.kills,
          outs: session.outs,
          catches: session.catches
        },
        active: true
      }

      // Push player object into userSession
      userSession[gameIndex].teams[teamIndex].push(sessionPlayer);
    })
    console.log('userSession:', userSession);
    
    yield put({type: 'UPDATE_STATS', payload: userSession})

  } catch (error) {
    console.log('error in initializeTracking:', error)
  }
}

function* statsSaga() {
    yield takeLatest('FETCH_STATS', fetchStats);
    yield takeLatest('SEND_STATS', sendStats);
    yield takeLatest('INITIALIZE_TRACKING', initializeTracking);
  }
  
  export default statsSaga;