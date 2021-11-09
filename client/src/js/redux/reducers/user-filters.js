const initialState ={
  postsFilter : 'ALL_POSTS'
}

const userFilters = (state = initialState, action) => {
  switch (action.type) {
   
    case 'ALL_POSTS':
      return state = {
        ...state,
        postsFilter: 'ALL_POSTS'
      }
    case 'MY_POSTS':
      return state =  {
        ...state,
        postsFilter: 'MY_POSTS'
      }

    default:
      return state
  }
}

export default userFilters
