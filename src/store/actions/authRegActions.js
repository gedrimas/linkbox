
import qs from 'qs'
import CON from '../constants'

export function registrationStart() {
  return {
    type: CON.REGISTRATION_START,
  }
}

export function registrationSuccess(res, regName, regPass) {
  return {
    type: CON.REGISTRATION_SUCCESS,
    payload: { res, regName, regPass },
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

    const authorizeWithGithub = async () => {
      const { name } = await userRegistration()
      const paramsToGetToken = {
        name,
        password: regPass,
      }
      const { token } = await getUserToken(paramsToGetToken)
      console.log('TEST-name', name)
      console.log('TEST-token', token)
    }
    authorizeWithGithub()
  }
}
