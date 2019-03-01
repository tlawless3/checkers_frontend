export const saveState = (state) => {
  try {
    if (state.activeGame) {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state', serializedState)
    }
  } catch (err) {
    console.error(err.message)
  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}