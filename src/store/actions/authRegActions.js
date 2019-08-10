
import qs from 'qs'
import CON from '../constants'
import { state } from '../../data/initialState'

const stateForSend = {}
stateForSend.state = state
export function registrationStart() {
  return {
    type: CON.REGISTRATION_START,
  }
}

export function registrationSuccess(token) {
  return {
    type: CON.REGISTRATION_SUCCESS,
    payload: token,
  }
}

export function registrationFailure(err) {
  return {
    type: CON.REGISTRATION_FAILURE,
    payload: { err },
  }
}
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

    const getUserToken = paramsToGetToken => fetch('http://localhost:3001/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(paramsToGetToken),
    }).then(res => res.json())

    const setInitialState = token => fetch('http://localhost:3001/mylinks', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stateForSend),
    }).then(res => console.log(res))

    const registerAndGetToken = async () => {
      const { name } = await userRegistration()
      console.log('JSON.stringify(state)', JSON.stringify(stateForSend))
      const paramsToGetToken = {
        name,
        password: regPass,
      }
      const { token } = await getUserToken(paramsToGetToken)
      dispatch(registrationSuccess(token))
      setTimeout(() => {
        setInitialState(token)
      }, 2000);
    }
    registerAndGetToken()
  }
}
