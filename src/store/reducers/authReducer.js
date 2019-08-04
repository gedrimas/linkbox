import CON from '../constants'

const initialState = {
  login:'',
  password: '',
  token: '',
}

const authorization = (state = initialState, action) => {
  switch(action.type){
    case(CON.REGISTRATION_START):
    return {
      ...state,
      token: 'pending',     
    }
    case(CON.REGISTRATION_SUCCESS):
      console.log('RES - - - -', action.payload)
      
    default:
      return state      
  }    
}

export default authorization