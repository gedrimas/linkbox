import axios from 'axios'
import qs from 'qs'
import CON from '../constants'


export function registrationStart() {
  return {
    type: CON.REGISTRATION_START,
  }
}

//export function authorization({ logName, logPass }) {
//}

export function registrationSuccess(regNameAndPass) {
  return {
    type: CON.REGISTRATION_SUCCESS,
    payload: regNameAndPass,
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

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    axios.post('http://localhost:3001/register', qs.stringify(requestBody), config)
      .then(res => dispatch(registrationSuccess(res)))
      .catch(err => dispatch(registrationFailure(err)))
  }
}
