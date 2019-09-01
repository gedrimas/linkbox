import CON from '../constants'
import { saveUserChanges } from './authRegActions'

export function addBlock(newBlock) {
  return {
    type: CON.ADD_BLOCK,
    payload: newBlock,
  }
}

export function addLink(newLink) {
  return {
    type: CON.ADD_LINK,
    payload: newLink,
  }
}

export function deletLink(linkParams) {
  return {
    type: CON.DEL_LINK,
    payload: linkParams,
  }
}

export function dellLink(linkParams) {
  return (dispatch, getState) => {
    dispatch(deletLink(linkParams))
    const {
      dnd,
      registration: {
        token,
      },
    } = getState()
    const newUserState = {}
    newUserState.state = dnd
    if (token) saveUserChanges(token, newUserState)
  }
}

