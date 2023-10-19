import { takeLatest, takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* fetchUsers() {
  try {
    const users = yield axios.get("/api/manageUsers");

    yield put({
      type: "SET_USER_LIST",
      payload: users.data,
    });
  } catch (error) {
    console.error(error);
  }
}
function* promoteUser(action) {
  try {
    const data = {
      payload: action.payload,
      auth: action.auth,
    };

    const users = yield axios.put(`/api/manageUsers/${action.payload}`, data);
  } catch (error) {
    console.error("get all error", error);
  }
}

function* manageUserSaga() {
  yield takeLatest("FETCH_USER_LIST", fetchUsers);
  yield takeLatest("PROMOTE_USER", promoteUser);
}

export default manageUserSaga;
