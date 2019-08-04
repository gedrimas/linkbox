import axios from 'axios'
import CON from '../constants'

export function registration({regName, regPass}) {
  return dispatch => {
    dispatch(registrationStart())
console.log('regName', regName)
console.log('regPass', regPass)

    axios({
      method: 'post',
      url: 'http://localhost:3001/register',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        name: regName,
        password: regPass,
      }
    })
      .then(res => dispatch(registrationSuccess(res)))
      .catch(err => dispatch(registrationFailure(err)))
  }
}

export function registrationStart(){
  return {
    type: CON.REGISTRATION_START
  }
}

export function registrationSuccess(res){
  return {
    type: CON.REGISTRATION_SUCCESS,
    payload: res 
  }
}

export function registrationFailure(err){
  return {
    type: CON.REGISTRATION_FAILURE,
    payload: { err }
  }
}