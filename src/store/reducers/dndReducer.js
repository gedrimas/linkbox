import { state as initialState } from '../../data/initialState'

const dnd = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COLUMN':
      return {
        ...state, ...state.columns, ...action.payload,
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
    default:
      return state
  }
}

export default dnd
