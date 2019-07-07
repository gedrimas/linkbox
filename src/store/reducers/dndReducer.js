const initialState = {
  links: {
    'link-1': { id: 'link-1', description: 'My first link', link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background/' },
    'link-2': { id: 'link-2', description: 'Watch my favorite show', link: 'https://soundcloud.com/ritmomusic/ritmo-some-kind-of-rhythm-001' },
    'link-3': { id: 'link-3', description: 'Chage my phone', link: 'https://stackoverflow.com/questions/8825144/detect-double-tap-on-ipad-or-iphone-screen-using-javascript/' },
    'link-4': { id: 'link-4', description: 'Cook dinner', link: 'https://www.robinwieruch.de/react-hooks-fetch-data/' },
    'link-5': { id: 'link-5', description: 'link ok block 2dsdasdasd asd asd as as asda sdasd asd as d sad ', link: 'https://habr.com/ru/post/326986/' },
    'link-6': { id: 'link-6', description: 'link ok block 2', link: 'https://www.npmjs.com/package/react-native-link-preview/' },
    'link-7': { id: 'link-7', description: 'link ok block 2', link: 'https://habr.com/ru/company/ruvds/blog/423483/' },
    'link-8': { id: 'link-8', description: 'link ok block 2', link: 'https://medium.com/@misterdev/how-to-write-a-webpack-scaffold-ace202775572/' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Mailing link',
      linksIds: ['link-1', 'link-2', 'link-3', 'link-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'About JavaScript',
      linksIds: ['link-5', 'link-6'],
    },
    'column-3': {
      id: 'column-3',
      title: 'some libs',
      linksIds: ['link-7', 'link-8'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}

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
        ...state, columnOrder: action.payload     
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
