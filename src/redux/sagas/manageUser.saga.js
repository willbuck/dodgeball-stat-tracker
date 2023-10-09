import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUsers() {
    try {
        const users = yield axios.get('/api/manageUsers');
        
        yield put({ 
            type: 'SET_USER_LIST', 
            payload: users.data
        });

    } catch (error){
        console.log('get all error', error);
    }
}


function* manageUserSaga() {  
    yield takeLatest('FETCH_USER_LIST', fetchUsers)
  
}

export default manageUserSaga;