import qs from 'qs'
import CON from '../constants'
import { state } from '../../data/initialState'
import backHost from '../../config'

const initialStateSave = {}
initialStateSave.state = state

function registrationStart() {
  return {
    type: CON.REGISTRATION_START,
  }
}

function authirizationStart() {
  return {
    type: CON.AUTHORIZATION_START,
  }
}

function authirizationFalue(error) {
  return {
    type: CON.AUTHORIZATION_FAILURE,
    payload: error,
  }
}

function registrationSuccess(token) {
  console.log('registrationSuccess', token)
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

export function registrationOrAuthFailure(err) {
  return {
    type: CON.REGISTRATION_FAILURE,
    payload: { err },
  }
}

export const saveInintalUserState = token => fetch(`https://${backHost}/mylinks`, {
  method: 'POST',
  headers: {
    Authorization: `JWT ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(initialStateSave),
}).then(res => console.log(res))

export const saveUserChanges = (token, newUserState) => {
  fetch(`https://${backHost}/mylinks`, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserState),
  }).then(res => console.log(res))
}

const getUserToken = paramsToGetToken => fetch(`https://${backHost}/sign_in`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: qs.stringify(paramsToGetToken),
}).then(res => res.json())

const getUserData = token => fetch(`https://${backHost}/mylinks`, {
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

    const userRegistration = () => fetch(`https://${backHost}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(requestBody),
    }).then(res => res.json())
      
    const registerAndGetToken = async () => {
      try {

        const response = await userRegistration()
        const { name } = response

        if(response.message && response.message.code === 11000) {
          throw new Error('This name is already exist')
        }

        const pass = regPass
        const paramsToGetToken = {
          name,
          password: regPass,
        }
        
        const { token } = await getUserToken(paramsToGetToken)
        dispatch(registrationSuccess({ token, cookies: {name, pass} }))
        setTimeout(() => {
          saveInintalUserState(token)
        }, 2000);
      }
      catch(error) {
        dispatch(registrationOrAuthFailure(error.message))
      }
      
    }
    registerAndGetToken()
  }
}

export function authorization({ logName, logPass }) {
  return (dispatch) => {

    dispatch(authirizationStart())

    const pass = logPass
    const name = logName
    const paramsToGetToken = {
      name: logName,
      password: logPass,
    }

    const authAndGetUserData = async () => {
      try {
        const response = await getUserToken(paramsToGetToken)
        console.log('222222222222222222222')
        if (response.message) throw new Error(response.message)
        const { token } = response
        const { state: userState } = await getUserData(token)
        dispatch(registrationSuccess({ token, cookies: {name, pass} }))
        dispatch(setUserState(userState))
      } catch(error) {
        console.log('response from authorization', error.message)
        dispatch(registrationOrAuthFailure(error.message))
      }
    }

    authAndGetUserData()
  }
}

export function signOut() {
  return {
    type: CON.SIGN_OUT,
  } 
}

export function showSignModal() {
  return {
    type: CON.SIGN_MODAL_SHOW,
  }
}

export function hideSignModal() {
  return {
    type: CON.SIGN_MODAL_HIDE,
  }
}

export function trimErrorMessage() {
  return {
    type: CON.TRIM_ERROR_MESSAGE,
  }
}