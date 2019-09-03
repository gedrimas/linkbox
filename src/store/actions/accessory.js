export const getActualStateAndSaveToDb = (getState, saveUserChanges) => {
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
export default getActualStateAndSaveToDb
