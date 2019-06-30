const initialState = {
  links: {
    'link-1': { id: 'link-1', description: 'My first link', link: 'www.mail.ru' },
    'link-2': { id: 'link-2', description: 'Watch my favorite show', link: 'www.mail.ru' },
    'link-3': { id: 'link-3', description: 'Chage my phone', link: 'www.mail.ru' },
    'link-4': { id: 'link-4', description: 'Cook dinner', link: 'www.mail.ru' },

    'link-5': { id: 'link-5', description: 'link ok block 2', link: 'www.mail.ru' },
    'link-6': { id: 'link-7', description: 'link ok block 2', link: 'www.mail.ru' },


    'link-7': { id: 'link-7', description: 'link ok block 2', link: 'www.mail.ru' },
    'link-8': { id: 'link-8', description: 'link ok block 2', link: 'www.mail.ru' },

  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Mailing link',
      linkIds: ['link-1', 'link-2', 'link-3', 'link-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'About JavaScript',
      linkIds: ['link-5', 'link-6'],
    },
    'column-3': {
      id: 'column-3',
      title: 'some libs',
      linkIds: ['link-7', 'link-8'],
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
    default:
      return state
  }
}

export default dnd
