import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // Sending UUID info to user reducer
      // Doing this first because anonymous users trigger the error catch before the other SET_USER dispatch can run
    
    // Post UUID to database
    const {data} = yield axios.post('/api/user/uuid', action.payload);
    const userInfo = {uuid: data[0].uuid, pseudonym: data[0].pseudonym, uuid_index: data[0].id}
    yield put({type: 'SET_USER', payload: userInfo})

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: {...userInfo, ...response.data} });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;
