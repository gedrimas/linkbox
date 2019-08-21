
import CON from '../constants'
import { state as initialState } from '../../data/initialState'

const dnd = (state = initialState, action) => {
  switch (action.type) {
    case CON.ADD_BLOCK:
      state.columnOrder.push(action.payload.blockKey)
      return {
        ...state, columns: {
          ...state.columns, [action.payload.blockKey]: action.payload.blockBody,
        },
      }
    case CON.ADD_LINK:
      state.columns[action.payload.parentColumnId].linksIds.push(action.payload.linkId)
      return {
        ...state, links: {
          ...state.links, [action.payload.linkId]: action.payload.newLink[action.payload.linkId],
        },
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
