import uniqid from 'uniqid'
import CON from '../constants'
import { state as initialState } from '../../data/initialState'

const dnd = (state = initialState, action) => {
  switch (action.type) {
    case CON.ADD_BLOCK:
/*       const blockId = uniqid()
      const newBlock = {
        blockId: {
          id: blockId,
          title: '',
          linksIds: [],
        }     
      } */
console.log('action', action)
      const arr = Object.entries(action.payload)
      const blockId = arr[0][0]
      const blockBody = arr [0][1]
      console.log('ID', blockId)
      console.log('OBJ', blockBody)

      state.columnOrder.push(blockId)
      return {
        ...state, columns: {
          ...state.columns, [blockId]: blockBody,
        },
        //columnOrder: newOrder,
      }
    case 'ADD_LINK_BLOCK':
      return {
        ...state,
        linkBlock: action.payload,
      }
    case 'MOVE_COLUMN':
      return {
        ...state, columnOrder: action.payload,
      }
    case 'MOVE_LINK_INSIDE_COLUMN':
      return {
        ...state, columns: {
          ...state.columns, [action.columnId]: {
            ...state.columns[action.columnId], linksIds: action.payload
          }
        }
      }
    case 'START_MOVE_LINK_BETWEEN_COLUMNS':
      return {
        ...state, columns: {
          ...state.columns, [action.startColumn]: {
            ...state.columns[action.startColumn], linksIds: action.startColumnLinksOrder 
          } 
        }
      }
    case 'FINISH_MOVE_LINK_BETWEEN_COLUMNS':
      return {
        ...state, columns: {
          ...state.columns, [action.finishColumn]: {
            ...state.columns[action.finishColumn], linksIds: action.finishColumnLinksOrder
          }
        }
      }
    case 'SET_USER_DATA':
      console.log('7777777777777777', action.payload)
      return {
        ...state, ...action.payload,
      }        
    default:
      return state
  }
}

export default dnd
