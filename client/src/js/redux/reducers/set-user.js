const setUser = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return (state = action.payload)
    case 'LOGOUT':
      return state = null
    default:
      return state
  }
}

export default setUser
