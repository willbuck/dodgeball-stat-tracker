import { takeLatest, put } from "redux-saga/effects";
import axios from 'axios';

function* deletePlayerForm(action){
    console.log('ACTION:', action.payload);
    const id = action.payload;
    yield axios.delete(`/api/deletePlayerForm/${action.payload}`);
}

function* deletePlayerFormSaga(){
    yield takeLatest('DELETE_PLAYER', deletePlayerForm);
}

export default deletePlayerFormSaga;