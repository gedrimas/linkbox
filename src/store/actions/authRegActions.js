import axios from 'axios'
import qs from 'qs'
import CON from '../constants'

export function registration({regName, regPass}) {
  return dispatch => {
    dispatch(registrationStart())
console.log('regName', regName)
console.log('regPass', regPass)

/*     axios({
      method: 'post',
      url: 'http://localhost:3001/register',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      name: regName,
      password: regPass,

    }) */

    const requestBody = {
      name: regName,
      password: regPass,
    }    

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post('http://localhost:3001/register', qs.stringify(requestBody), config)
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