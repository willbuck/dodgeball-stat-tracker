import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    console.log('action.payload for first SET_USER:', action.payload)
    yield put({type: 'SET_USER', payload: action.payload})
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    console.log('user object for second SET_USER:', {...action.payload, ...response.data})

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: {...action.payload, ...response.data} });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;
