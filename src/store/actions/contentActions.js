import CON from '../constants'

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
