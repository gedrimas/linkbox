
import qs from 'qs'
import CON from '../constants'
import { state } from '../../data/initialState'

const initialStateSave = {}
initialStateSave.state = state

function registrationStart() {
  return {
    type: CON.REGISTRATION_START,
  }
}

function registrationSuccess(token) {
  return {
    type: CON.REGISTRATION_SUCCESS,
    payload: token,
  }
}

function setUserState(s) {
  return {
    type: 'SET_USER_DATA',
    payload: s,
  }
}

export function registrationFailure(err) {
  return {
    type: CON.REGISTRATION_FAILURE,
    payload: { err },
  }
}

export const saveInintalUserState = token => fetch('http://localhost:3001/mylinks', {
  method: 'POST',
  headers: {
    Authorization: `JWT ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(initialStateSave),
}).then(res => console.log(res))

export const saveUserChanges = (token, newUserState) => {
  fetch('http://localhost:3001/mylinks', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserState),
  }).then(res => console.log(res))
}

const getUserToken = paramsToGetToken => fetch('http://localhost:3001/sign_in', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: qs.stringify(paramsToGetToken),
}).then(res => res.json())

const getUserData = token => fetch('http://localhost:3001/mylinks', {
  method: 'GET',
  headers: {
    Authorization: `JWT ${token}`,
  },
}).then(res => res.json())

export function registration({ regName, regPass }) {
  return (dispatch) => {
    dispatch(registrationStart())
    const requestBody = {
      name: regName,
      password: regPass,
    }

    const userRegistration = () => fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(requestBody),
    }).then(res => res.json())

    const registerAndGetToken = async () => {
      const { name } = await userRegistration()
      const paramsToGetToken = {
        name,
        password: regPass,
      }
      const { token } = await getUserToken(paramsToGetToken)
      dispatch(registrationSuccess(token))
      setTimeout(() => {
        saveInintalUserState(token)
      }, 2000);
    }
    registerAndGetToken()
  }
}

export function authorization({ logName, logPass }) {
  return (dispatch) => {
    const paramsToGetToken = {
      name: logName,
      password: logPass,
    }
    const authAndGetUserData = async () => {
      const { token } = await getUserToken(paramsToGetToken)
      const { state: s } = await getUserData(token)
      dispatch(registrationSuccess(token))
      //setUserState(s)
      dispatch(setUserState(s))
    }
    authAndGetUserData()
  }
}
