import CON from '../constants'

const initialState = {
  login: '',
  password: '',
  token: '',
}

const registration = (state = initialState, action) => {
  switch (action.type) {
    case (CON.REGISTRATION_START):
      return {
        ...state,
        token: 'pending',
      }
    case (CON.REGISTRATION_SUCCESS):
      console.log('RES - - - -', action.payload)
      return {
        ...state,
        login: action.payload.regName,
        password: action.payload.regPass,
      }
      
    default:
      return state
  }
}

export default registration
