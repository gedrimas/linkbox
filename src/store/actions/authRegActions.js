import axios from 'axios'
import qs from 'qs'
import CON from '../constants'

export function registration({regName, regPass}) {
  return dispatch => {
    dispatch(registrationStart())

    const requestBody = {
      name: regName,
      password: regPass,
    }    

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

/*     const userRegistration = () =>      
      axios.post('http://localhost:3001/register', qs.stringify(requestBody), config)
        .then(res => dispatch(registrationSuccess(res, regName, regPass)))
        .catch(err => dispatch(registrationFailure(err))) */

        const userRegistration = () => fetch('http://localhost:3001/register',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: qs.stringify(requestBody)
        }).then(res => res.json())  
    
    
        const getUserToken = (requestBody) => fetch('http://localhost:3001/sign_in',{
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: qs.stringify(requestBody)
        }).then(res => res.json())

/*     const getUserToken = (regName, regPass) => {
      const requestBody = {
        name: regName,
        password: regPass,
      }    
  
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      
      axios.post('http://localhost:3001/sign_in', qs.stringify(requestBody), config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } */


    const authorizeWithGithub = async () => {
      const { name } = await userRegistration()
      const paramsToGetToken = {
        name: name,
        password: regPass,
      }
      const { token } = await getUserToken(paramsToGetToken)
      console.log('TEST-name', name)
      console.log('TEST-token', token)
    }

    authorizeWithGithub()

  }
}

export function registrationStart(){
  return {
    type: CON.REGISTRATION_START
  }
}

export function registrationSuccess(res, regName, regPass){
  return {
    type: CON.REGISTRATION_SUCCESS,
    payload: { res, regName, regPass }
  }
}

export function registrationFailure(err){
  return {
    type: CON.REGISTRATION_FAILURE,
    payload: { err }
  }
}