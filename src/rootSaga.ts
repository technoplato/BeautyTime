import {all, put, takeEvery, delay, cancel, fork} from 'redux-saga/effects'
import {startTimer, stopTimer, tick} from './timer/timer.slice'
import {Task} from 'redux-saga'

let tickTask: Task

function* startTickSaga() {
  while (true) {
    yield delay(1000)
    yield put(tick())
  }
}

function* stopTimerSaga() {
  yield cancel(tickTask)
}

function* timerSaga() {
  yield takeEvery(startTimer, function* () {
    tickTask = yield fork(startTickSaga)
  })
  yield takeEvery(stopTimer, stopTimerSaga)
}

export function* rootSaga() {
  yield all([timerSaga()])
}
