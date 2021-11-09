import axios from 'axios'

export const setUser = (payload) => ({ type: 'SET_USER', payload })

export const getUser = () => async (dispatch) => {
  if (localStorage.key('token')) {
    const {data} = await axios
      .get('/api/login', {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      })
      .catch((e) => console.log(e))
    dispatch(setUser(data))
  }
}
