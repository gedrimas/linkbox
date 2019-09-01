import CON from '../constants'

const initialState = {
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
      return {
        ...state,
        //token: `JWT ${action.payload}`,
        token: `${action.payload}`,
        
      }
      
    default:
      return state
  }
}

export default registration
