import CON from '../constants'

const initialState = {
  token: '',
  isModalShow: false,
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
    case (CON.SIGN_MODAL_SHOW):
      return {
        ...state,
        isModalShow: true,
      }
    case (CON.SIGN_MODAL_HIDE): 
      return {
        ...state,
        isModalShow: false,
      }
    case (CON.SIGN_OUT):
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default registration
