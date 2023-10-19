import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* updatePlayer(action) {
  yield axios.put("/api/updatePlayer", action.payload);
  yield put({
    type: "GET_PLAYER",
  });
}

function* updatePlayerSaga() {
  yield takeLatest("UPDATE_PLAYER", updatePlayer);
}

export default updatePlayerSaga;
