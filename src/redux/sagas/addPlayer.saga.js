import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* addPlayer(action) {
  console.log("Action:", action.payload);
  yield axios.post("/api/addPlayer", action.payload);
  yield put({
    type: "FETCH_PLAYERS",
  });
}

function* addPlayerSaga() {
  yield takeLatest("ADD_PLAYER", addPlayer);
}

export default addPlayerSaga;
